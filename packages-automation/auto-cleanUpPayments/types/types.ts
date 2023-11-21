export interface AndpadCsvData {
  'ID': number
  '状態': string
  '顧客名': string
  'システムID': number
  '案件管理ID': string | null
  '契約番号': string
  '問合番号': number
  '案件名': string
  '主担当': string
  '主担当 所属店舗': string
  '入金項目': string
  '入金予定日': string | null
  '入金予定額': number
  '入金日': string | null
  '入金額': number
  '手数料': number
  '入金方法': string | null
  '請求日': string | null
  '領収書発行日': string | null
}


export interface AndpadCsv {
  'data': AndpadCsvData[],
  'errors': [],
  'meta': {
    'delimiter': string
    'linebreak': string
    'aborted': boolean
    'truncated': boolean
    'cursor': number
    'fields': string[]
  }
}