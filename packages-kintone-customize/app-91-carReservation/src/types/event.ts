export interface IndexEvent {
  viewId: number,
}

export type KSavedRecord = keyof DB.SavedRecord;

export interface KintoneEvent {
  record: DB.SavedRecord,
  type: string
}