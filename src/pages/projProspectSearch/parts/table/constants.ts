import { TKeyOfSearchResult } from '../../api/searchProject';

import { TableCellProps } from '@mui/material';

export const headCells : (TKeyOfSearchResult)[][] = [
  ['ランク', '顧客番号', '工事番号'],
  ['顧客名', '工事名'],
  ['ここすもAG'],
  ['店舗名', 'ゆめてつAG', 'ここすも工事'],
  ['契約予定金額'],
  ['不動産決済日', '設計申し込み日', '契約予定日'],
  ['経過日数', '作成日時', '更新日時' ],
];

export const cellAlign: TableCellProps['align'][]  = ['center', 'left', 'left', 'left', 'right', 'right', 'right'];