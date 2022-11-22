
export interface ISearchData {
  '顧客ID': number,
  '顧客種別': string,
  '案件数': string,
  '顧客氏名・会社名': string,
  '現住所': string,
  '領域・店舗': string,
  'ゆめてつAG': string,
  'ここすも営業': string,
  '登録日時': string,
  '更新日時': string,
}

export type KSearchData = keyof ISearchData;


export const rowsPerPageOptions = [50, 100];
export type RowsPerPageOption = typeof rowsPerPageOptions[number];

export const headCells : (KSearchData)[][] = [
  ['顧客ID',  '顧客種別', '案件数' ],
  ['顧客氏名・会社名', '現住所'],
  ['領域・店舗', 'ここすも営業', 'ゆめてつAG'],
  ['登録日時', '更新日時'],
];

export const cellWidth = [
  '',
  '30%',
  '25%',
  '',
];