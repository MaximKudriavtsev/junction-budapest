import { Meteor } from 'meteor/meteor';
import { transfers } from '../../static/transfers';
import { recipient } from '../../static/recipient';

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

// export const sortTransfers = transfers.sort((a, b) => {
//   if (moment(a.submit_time).isBefore(moment(b.submit_time))) return 1;
//   if (moment(a.submit_time).isAfter(moment(b.submit_time))) return -1;
//   return 0;
// });

/* eslint-disable */
export const getTransactionGroups = () => {
	const transactionGroups = [];

	transfers.forEach((transfer) => {
		const currentRecipient = recipient.find(recipient => recipient.id === transfer.recipient_id);
		const groupIndex = transactionGroups.findIndex(group => group.country === currentRecipient.country);

		if (groupIndex !== -1) {
			transactionGroups[groupIndex].count += 1;
		} else {
			transactionGroups.push({
				country: currentRecipient.country,
				count: 1,
			});
		}
	});

	return transactionGroups;
};

export const getTransactionMeta = (transfer) => {
	const currentRecipient = recipient.find(recipient => recipient.id === transfer.recipient_id);

	return {
		country: currentRecipient.country,
		city: currentRecipient.city,
		value: transfer.source_amount,
		id: transfer.id,
	};
};

export async function sendTransactionByTime() {
	for (let index; index < transfers.length; index += 1) {
		const currentAmount = Math.floor(Math.random() * 10);
		const currentData = [];
		
		Array(currentAmount).map((el, i) => {
			currentData.push(transfers[index + i]);
		});

		const transfersMeta = currentData.map(transfer => getTransactionMeta(transfer));
		// sendWithMeteor(transfersMeta);
		Meteor.publish('transfers', function transfersPublication() {
			return transfersMeta;
		});
		await sleep(2000);
	}
};

export const generateTransactions = (transactions) => {
	const transactionsWithCoord = [];
  
	for (let index = 0; index < transactions.length; index += 1) {
	  transactionsWithCoord.push({
		id: transactions[index].id,
		startX: Math.random() * 1000,
		startY: Math.random() * 500,
		endX: Math.random() * 1000,
		endY: Math.random() * 500,
		scale: Math.random(),
	  });
	}
  
	return transactionsWithCoord;
  };