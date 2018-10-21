import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { Line } from './line';
import { generateTransactions } from '../../api/logic';

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  backgroundColor: '#1a1a1a',
  margin: '0 auto',
  position: 'relative',
};

class BasicMap extends Component {
  constructor() {
    super()
    this.state = {
        worldData: [],
    }
  }
  componentDidMount() {
      fetch("https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/examples/choropleth-map/static/world-50m-with-population.json")
          .then(response => {
              if (response.status !== 200) {
                  console.log(`There was a problem: ${response.status}`)
                  return
              }
              response.json().then(worldData => {
                  this.setState({
                      worldData: worldData,
                  })
              })
          })
  }

  render() {
    const { transactions } = this.props;
    console.log(transactions);


    return (
      <div style={wrapperStyles}>
        {generateTransactions(transactions).map(({ id, ...coords }) => (
          <Line
            key={id}
            {...coords}
          />
        ))}
        {this.state.worldData.length !== 0 ? (

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
            <Geographies geography={this.state.worldData}>
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
        ) : (
          <div>
            loading...
          </div>
        )}
      </div>
    );
  }
}

export default BasicMap;
