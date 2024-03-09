import { Box, TableHead, TableSortLabel } from '@mui/material';
import { RowLayout } from './RowLayout';
import { SearchResult } from '../../types';
import { Order } from 'types';
import { visuallyHidden } from '@mui/utils';
import { useParseQuery } from '../../hooks/useParseQuery';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { removeNullFalsyEmptyFromObject } from 'libs';
import { pages } from 'kokoas-client/src/pages/Router';
import { TypeOfForm } from '../../schema';

const EnhancedTableCell = ({
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
};

export const ResultHead = () => {
  const query = useParseQuery();

  return (
    <TableHead>
      <RowLayout
        custName={'顧客名'}
        custNameKana={'顧客名（カナ）'}
        custAddress={'発注者住所'} // 反映しませんが、変わるような予感がするので、とりあえず、残す
        projName={'工事名'}
        tel={'電話番号'}
        telRelation={'続柄'}
        storeName={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='storeSortNumber'
            label='店舗名'
          />
        )}
        projDataId={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='projDataId'
            label='工事番号'
          />
        )}
        contractDate={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='contractDate'
            label='契約日'
          />
        )}
        procurementPaymentDateStart={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='procurementPaymentDateStart'
            label='支払開始日'
          />
        )}
        procurementPaymentDateEnd={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='procurementPaymentDateEnd'
            label='支払完了日'
          />
        )}
        deliveryDate={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='deliveryDate'
            label='引渡日'
          />
        )}
        payFinDate={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='payFinDate'
            label='支払完了日'
          />
        )}
        receivableCompleteDate={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='receivableCompleteDate'
            label='入金完了日'
          />
        )}
        projFinDate={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='projFinDate'
            label='物件完了日'
          />
        )}
        lastBillDate={(
          <EnhancedTableCell
            existingQuery={query}
            fieldName='lastBillDate'
            label='最終請求日'
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