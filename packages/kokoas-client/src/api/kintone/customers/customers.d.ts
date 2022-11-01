





export interface KintoneAPIResult {
  id: string,
  revision: string
}

export interface AddRecordsResult {
  ok: boolean,
  result: KintoneAPIResult[] | any
}