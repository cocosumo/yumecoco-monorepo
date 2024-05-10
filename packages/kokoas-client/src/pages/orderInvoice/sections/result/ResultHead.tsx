import { 
//   Box, 
  TableHead, 
//   TableSortLabel, 
} from '@mui/material';
import { RowLayout } from './RowLayout';
// import { SearchResult } from '../../types';
// import { Order } from 'types';
// import { visuallyHidden } from '@mui/utils';
// import { useParseQuery } from '../../hooks/useParseQuery';
// import { useNavigate } from 'react-router-dom';
// import qs from 'qs';
// import { removeNullFalsyEmptyFromObject } from 'libs';
// import { pages } from 'kokoas-client/src/pages/Router';
// import { TypeOfForm } from '../../schema';

/* const EnhancedTableCell = ({
  fieldName,
  label,
  existingQuery,
}: {
  fieldName: keyof SearchResult,
  label: string,
  existingQuery: TypeOfForm
}) => {

  const {
    orderBy,
    order,
  } = existingQuery;
  const navigate = useNavigate();

  const isActive = (orderBy as keyof SearchResult) === fieldName;

  return (
    <TableSortLabel
      active={isActive}
      direction={isActive ? (order as Order) : 'asc'}
      onClick={() => {
        const queryStr = qs.stringify(
          removeNullFalsyEmptyFromObject({
            ...existingQuery,
            orderBy: fieldName,
            order: (order as Order) === 'asc' ? 'desc' : 'asc',
          }),
          { arrayFormat: 'comma', encode: false },
        );
        navigate(`${pages.projSearch}?${queryStr}`);
      }}
    >
      {label}
      {(orderBy as keyof SearchResult) === 'storeSortNumber' ? (
        <Box component="span" sx={visuallyHidden}>
          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
        </Box>
      ) : null}
    </TableSortLabel>
  );
}; */

export const ResultHead = () => {
  // const query = useParseQuery();

  return (
    <TableHead>
      <RowLayout
        invoiceStatus={'ステータス'}
        projName={'工事名'}
        storeName={'店舗名'}
        cocoAgName={'ここすもAG'}
        supplierName={'業者名'}
        invoiceSystemNumber={'適格番号'}
        orderAmount={'発注金額'}
        paymentAmount={'支払金額'}
        invoiceDate={'請求日'}
        createdAt={'作成日時'}
        updatedAt={'更新日時'}
      />
    </TableHead>
  );
};