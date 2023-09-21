export const recordCancelStatuses = [
  '他決',
  '中止',
  '削除',
] as const;


export type RecordCancelStatus = typeof recordCancelStatuses[number];

export const orders = ['asc', 'desc'] as const;
export type Order = typeof orders[number];

export const taxChoices = ['課税', '非課税'] as const;
export type TaxType = typeof taxChoices[number];