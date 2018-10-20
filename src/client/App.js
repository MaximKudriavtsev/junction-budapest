import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import WordMap from './components/basic-map';

export default class App extends Component {
  render() {
    return (
      <div>
        <WordMap />
      </div>
    );
  }
}
