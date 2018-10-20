// import moment from 'moment';
import { transfers } from '../../static/transfers';
import { recipient } from '../../static/recipient';

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

export const sendTransactionByTime = () => {
	for (let index; index < transfers.length; index += 1) {
		const currentAmount = Math.floor(Math.random() * 10);
		const currentData = [];
		
		Array(currentAmount).map((el, i) => {
			currentData.push(transfers[index + i]);
		});

		const transfersMeta = currentData.map(transfer => getTransactionMeta(transfer));
		// sendWithMeteor(transfersMeta);
	}
};