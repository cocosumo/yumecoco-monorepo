import { 
  TableHead,
  TableSortLabel, 
} from '@mui/material';
import { RowLayout } from './RowLayout';
import { KeyOfSearchResult } from '../../types';
import { TypeOfForm } from '../../schema';
import { useNavigate } from 'react-router-dom';
import { removeNullFalsyEmptyFromObject } from 'libs';
import { Order } from 'types';
import qs from 'qs';
import { pages } from 'kokoas-client/src/pages/Router';
import { useParsedQuery } from '../../hooks/useParsedQuery';

const EnhancedTableCell = ({
  fieldName,
  label,
  existingQuery,
}: {
  fieldName: KeyOfSearchResult,
  label: string,
  existingQuery: TypeOfForm
}) => {

  const {
    orderBy,
    order,
  } = existingQuery;
  const navigate = useNavigate();

  const isActive = (orderBy as KeyOfSearchResult) === fieldName;

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
        navigate(`${pages.projOrderInvoiceSearch}?${queryStr}`);
      }}
    >
      {label}
    </TableSortLabel>
  );
}; 

export const ResultHead = () => {
  const query = useParsedQuery();

  return (
    <TableHead>
      <RowLayout
        invoiceStatus={'ステータス'}
        projName={'工事名'}
        storeName={'店舗名'}
        cocoAgName={'ここすもAG'}
        supplierName={'業者名'}
        invoiceSystemNumber={'適格番号'}
        orderAmount={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='orderAmount'
            label='発注金額'
          />
        )}
        paymentAmount={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='paymentAmount'
            label='支払金額'
          />
        )}
        invoiceDate={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='invoiceDate'
            label='請求日'
          />
        )}
        createdAt={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='createdAt'
            label='作成日時'
          />
        )}
        updatedAt={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='updatedAt'
            label='更新日時'
          />
        )}
      />
    </TableHead>
  );
};