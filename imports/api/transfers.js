import { Meteor } from 'meteor/meteor';
import { sendTransactionByTime } from './logic';
// import { transfers } from '../../static/transfers';

export const Transfers = new Mongo.Collection('transfers');

let index = 0;

if (Meteor.isServer) {
    Meteor.publish('transfers', function transfersPublication() {
        return Transfers.find({});
        // let prevIndex = index;
        // index += Math.floor(5 + Math.random() * (18-5+1));
        // return Transfers.find({
        //     id: { $lt: index + 1, $gt: prevIndex - 1 }
        // });
    });
}

Meteor.methods({
    'transfers.insert'() {
        console.log('INSERT');

        Transfers.insert({});
    },
    // 'transfers.remove'() {
    //     console.log('REMOVE');

    //     Transfers.remove({});
    // },
});
