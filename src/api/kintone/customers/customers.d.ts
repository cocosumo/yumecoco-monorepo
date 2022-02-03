

export interface RecordParam {
  [fieldCode : string] : { value: unknown }
}

export interface AppRecord {
  app: string,
  record: RecordParam
}

export interface KintoneAPIResult {
  id: string,
  revision: string
}

export interface AddRecordResult {
  ok: boolean,
  result: KintoneAPIResult | any
}

export interface AddRecordsResult {
  ok: boolean,
  result: KintoneAPIResult[] | any
}