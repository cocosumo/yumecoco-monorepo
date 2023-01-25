export interface KintoneEvent {
  record: DB.SavedRecord,
  appId: string,
  recordId: string,
  error: string,
}

export type KeyOfDB = keyof DB.SavedRecord;