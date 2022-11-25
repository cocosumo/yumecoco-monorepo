export const recordCancelStatuses = [
  '他決',
  '中止',
  '削除',
] as const;


export type RecordCancelStatus = typeof recordCancelStatuses[number];
export type Order = 'asc' | 'desc';