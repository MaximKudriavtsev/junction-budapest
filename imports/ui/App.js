import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import './app.css';
import WordMap from './components/basic-map';
import { Transfers } from '../api/transfers.js';

class App extends Component {
  render() {
    const { transfers } = this.props;

    setTimeout(() => {
      Meteor.call('transfers.insert');
    }, 5000);

    return (
      <div>
        <div className="title">TSU Team</div>
        <WordMap transactions={transfers} />
      </div>
    );
  }
}

let index = 0;

export default withTracker(() => {
  Meteor.subscribe('transfers');

  // let prevIndex = index;
  // index += Math.floor(5 + Math.random() * (18-5+1));
  // return {
  //   transfers: Transfers.find({
  //     id: { $lt: index + 1, $gt: prevIndex - 1 }
  //   }).fetch(),
  // };
  return ({
    transfers: Transfers.find({}).fetch(),
  });
})(App);
