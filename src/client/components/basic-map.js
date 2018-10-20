import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { Line } from './line';

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  backgroundColor: '#1a1a1a',
  margin: '0 auto',
  position: 'relative',
};

class BasicMap extends Component {
  render() {
    const { transactions } = this.props;

    return (
      <div style={wrapperStyles}>
        {transactions.map(({ id, ...coords }) => (
          <Line
            key={id}
            {...coords}
          />
        ))}
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
              {(geographies, projection) => geographies.map((geography, index) => {
                return (
                  <Geography
                    key={index.toString()}
                    geography={geography}
                    projection={projection}
                    onClick={this.handleClick}
                    style={{
                      default: {
                        fill: '#292929',
                        stroke: '#afdafc',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      hover: {
                        fill: '#292929',
                        stroke: '#afdafc',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#292929',
                        stroke: '#afdafc',
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
