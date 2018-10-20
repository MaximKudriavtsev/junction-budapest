export const transactions = [
  { name: 'RU', count: 1000 },
  { name: 'ZW', count: 900 },
  { name: 'JP', count: 840 },
  { name: 'ID', count: 500 },
  { name: 'SN', count: 30 },
  { name: 'MI', count: 200 },
  { name: 'TH', count: 100 },
  { name: 'SR', count: 150 },
  { name: 'BR', count: 94 },
  { name: 'NO', count: 66 },
  { name: 'GR', count: 670 },
  { name: 'US', count: 300 },
  { name: 'CN', count: 780 },
];

export const generateTransactions = (count) => {
  const transactionsWithCoord = [];

  for (let index = 0; index < count; index += 1) {
    transactionsWithCoord.push({
      id: index,
      startX: Math.random() * 1000,
      startY: Math.random() * 500,
      endX: Math.random() * 1000,
      endY: Math.random() * 500,
      scale: Math.random(),
    });
  }

  return transactionsWithCoord;
};
