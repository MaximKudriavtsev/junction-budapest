import { transfers } from '../../static/transfers';
import { recipient } from '../../static/recipient';

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