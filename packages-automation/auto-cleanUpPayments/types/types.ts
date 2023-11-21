export interface AndpadCsvData {
  'ID': string
  '状態': string
  '顧客名': string
  'システムID': number
  '案件管理ID': string
  '契約番号': string
  '問合番号': string
  '案件名': string
  '主担当': string
  '主担当 所属店舗': string
  '入金項目': string
  '入金予定日': string
  '入金予定額': string
  '入金日': string
  '入金額': string
  '手数料': string
  '入金方法': string
  '請求日': string
  '領収書発行日': string
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