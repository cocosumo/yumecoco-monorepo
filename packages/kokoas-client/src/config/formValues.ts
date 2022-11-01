export const recordCancelStatuses = [
  '他決',
  '中止',
  '削除',
] as const;

export const recordStatuses = [
  '情報登録のみ',
  '追客中',
  '契約申請中',
  '契約済',
  '工事進行中',
  '工事完了(未精算)',
  '工事完了(精算済)',
  '他決',
  '中止',
  '削除',
  '削除 (工事)',
] as const;



export type RecordStatus = typeof recordStatuses[number];
export type RecordCancelStatus = typeof recordCancelStatuses[number];