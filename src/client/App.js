import React, { Component } from 'react';
import './app.css';
import WordMap from './components/basic-map';
import { generateTransactions } from './components/transactions';

/* eslint-disable */
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: generateTransactions(10),
    };

    this.loadTransactions = this.loadTransactions.bind(this);
  }

  loadTransactions() {
    this.setState({
      transactions: generateTransactions(10),
    });
  }

  render() {
    const { transactions } = this.state;

    return (
      <div>
        <WordMap transactions={transactions} />
        <button onClick={this.loadTransactions}>
          add transactions
        </button>
      </div>
    );
  }
}
