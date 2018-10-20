import React, { Component } from 'react';
import './app.css';
import WordMap from './components/basic-map';
import { generateTransactions } from './components/transactions';
import { sortTransfers } from '../server/logic';

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

    console.log(sortTransfers);

    setTimeout(() => {
      this.setState({
        transactions: generateTransactions(10),
      });
    }, 3000);

    return (
      <div>
        <div className="title">TSU Team</div>
        <WordMap transactions={transactions} />
      </div>
    );
  }
}
