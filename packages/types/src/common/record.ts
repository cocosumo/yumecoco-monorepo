export const recordCancelStatuses = [
  '他決',
  '中止',
  '削除',
] as const;


export type RecordCancelStatus = typeof recordCancelStatuses[number];
export type Order = 'asc' | 'desc';

export const taxChoices = ['課税', '非課税'] as const;
export type TaxType = typeof taxChoices[number];