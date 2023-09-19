import { KSearchResult } from '../types';
import { Box, TableHead, TableSortLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Order } from 'types';
import { KForm, TForm } from '../schema';
import { removeNullFalsyEmptyFromObject } from 'libs';
import qs from 'qs';
import { pages } from '../../Router';
import { visuallyHidden } from '@mui/utils';
import { useParseQuery } from '../hooks/useParseQuery';
import { RowLayout } from './RowLayout';


const EnhancedTableCell = ({
  fieldName,
  label,
  existingQuery,
}: {
  fieldName: KSearchResult,
  label: string,
  existingQuery: TForm
}) => {

  const {
    orderBy,
    order,
  } = existingQuery;
  const navigate = useNavigate();

  const isActive = (orderBy as KForm) === fieldName;

  return (
    <TableSortLabel
      active={isActive}
      direction={isActive ? (order as Order) : 'asc'}
      onClick={() => {
        const queryStr =  qs.stringify(
          removeNullFalsyEmptyFromObject({ 
            ...existingQuery, 
            orderBy: fieldName, 
            order: (order as Order) === 'asc' ? 'desc' : 'asc', 
          }), 
          { arrayFormat: 'comma', encode: false },
        );
        navigate(`${pages.projProspectSearch}?${queryStr}`);
      }}
    >
      {label}
      {(orderBy as KSearchResult) === 'storeSortNumber' ? (
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
        rank={'ランク'}
        custNames={'顧客名'}
        projName={'工事名'}
        storeName={(
          <EnhancedTableCell 
            existingQuery={query}
            fieldName='storeSortNumber'
            label='店舗名'
          />
        )}
        yumeAG={'ゆめてつAG'}
        cocoConst={'ここすも工事'}
        schedContractAmt={'契約予定金額'}
        estatePurchaseDate={'不動産決済日'}
        planApplicationDate={'設計申込日'}
        schedContractDate={'契約予定日'}  
        createDate={(
          <EnhancedTableCell 
            existingQuery={query}
            fieldName='createDate'
            label='作成日時'
          />
        )}
        updateDate={(
          <EnhancedTableCell 
            existingQuery={query}
            fieldName='updateDate'
            label='更新日時'
          />
        )}
      />
    </TableHead>
  );
};