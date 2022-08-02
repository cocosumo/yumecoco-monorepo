import { Link } from 'react-router-dom';
import { dateStrToJA } from '../../../../helpers/utils';
import { pages } from '../../../Router';
import { TKeyOfSearchResult, TSearchResult } from '../../api/searchProject';

export const CellItem = (
  props:
  {
    cellHeader: TKeyOfSearchResult,
    row: TSearchResult[number],
  },
) => {

  const { cellHeader, row } = props;
  const cellValue = row[cellHeader];
  switch (cellHeader) {
    case '工事番号': return (
      <Link to={`${pages.projEdit}?projId=${row['工事番号']}` } target="_blank" rel="noopener noreferrer">
        {cellValue}
      </Link>);
    case '顧客番号': return (
      <Link to={`${pages.custGroupEdit}?projId=${row['工事番号']}&groupId=${row['顧客番号']}`} target="_blank" rel="noopener noreferrer">
        {cellValue}
      </Link>
    );

    case '更新日時':
    case '作成日時': return (
      <>{dateStrToJA(cellValue?.toString())}</>
    );

    case '不動産決済日':
    case '契約予定日':
    case '設計申し込み日': return (
      <>{dateStrToJA(cellValue?.toString(), false)}</>
    );

    case '経過日数': return (
      <>{cellValue}日</>
    );


    default: return (
      <> {cellValue ?? '-'} </>
    );
  }


};