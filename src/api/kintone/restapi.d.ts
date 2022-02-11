

export type AddRecordFn = (record: RecordParam) => Promise<AddRecordResult>;

export interface RecordParam {
  [fieldCode: string]: { value: unknown }
}

export interface AppRecord {
  app: string,
  record: RecordParam
}

export interface AddRecordResult {
  id: string,
  revision: string
}

export interface AddRecordsResult {
  ids: string[],
  revisions: string[],
  records: AddRecordResult[];
}

