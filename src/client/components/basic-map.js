import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { getTransactionGroups } from '../../server/logic';
import { Line } from './line';

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  // margin: "0 auto",
};

class BasicMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: undefined,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      transactions = prevState.transactions,
    } = nextProps;

    return {
      transactions,
    };
  }

  render() {
    const { transactions: trans } = this.state;

    const sortTransactionGroups = getTransactionGroups().sort((a, b) => {
      if (a.count > b.count) {
        return 1;
      }
      if (a.count < b.count) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    });

    console.log(sortTransactionGroups);

    return (
      <div style={wrapperStyles}>
        {trans.map(({ id, ...coords }) => (
          <Line
            key={id}
            {...coords}
          />
        ))}
        <Line
          startX={500}
          startY={400}
          endX={200}
          endY={300}
        />
        <ComposableMap
          projectionConfig={{
            scale: 160,
            rotation: [0, 0, 0],
          }}
          width={700}
          height={450}
          style={{
            width: '100%',
            height: 'auto',
          }}
        >
          <ZoomableGroup center={[0, 20]}>
            <Geographies geography="../../static/world.json">
              {(geographies, projection) => geographies.map((geography, i) => {
                const popScale = scaleLinear()
                  .domain([sortTransactionGroups[0].count, sortTransactionGroups[Math.floor(sortTransactionGroups.length / 2)].count, sortTransactionGroups[sortTransactionGroups.length - 1].count])
                  .range(['#0000FF', '#00FF00', '#FF0000']);
                // if (geography.properties.iso_a2 === 'RUS') {
                console.log(`${geography.properties.iso_a2} - ${geography.properties.name}`);

                // }
                // console.log(geography.properties);


                const index = sortTransactionGroups.findIndex(group => group.country === geography.properties.iso_a2);

                return (
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    onClick={this.handleClick}
                    style={{
                      default: {
                        fill: popScale(index === -1 ? 0 : sortTransactionGroups[index].count),
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      hover: {
                        fill: '#263238',
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#263238',
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      }
                    }}
                  />
                );
              })}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    );
  }
}

export default BasicMap;
