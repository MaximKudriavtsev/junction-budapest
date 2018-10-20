import React, { Component } from 'react';
import './app.css';
import WordMap from './components/basic-map';
import { generateTransactions } from './components/transactions';

export default class App extends Component {
  render() {
    const transactions = generateTransactions(10);
    return (
      <div>
        <WordMap transactions={transactions} />
      </div>
    );
  }
}
