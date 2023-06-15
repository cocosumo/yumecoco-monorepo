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

export const ResultHead = () => {
  const query = useParseQuery();

  const {
    orderBy,
    order,
  } = query;

  const navigate = useNavigate();

  return (
    <TableHead>
      <RowLayout 
        custName={'顧客名'}
        custNameKana={'顧客名（カナ）'}
        custAddress={'発注者住所'} // 反映しませんが、変わるような予感がするので、とりあえず、残す
        projName={'工事名'}
        tel={'電話番号'}
        storeName={(
          <TableSortLabel
            active={(orderBy as keyof SearchResult) === 'storeSortNumber'}
            direction={(orderBy as keyof SearchResult) === 'storeSortNumber' ? (order as Order) : 'asc'}
            onClick={() => {
              const queryStr =  qs.stringify(
                removeNullFalsyEmptyFromObject({ ...query, orderBy: 'storeSortNumber', order: (order as Order) === 'asc' ? 'desc' : 'asc' }), 
                { arrayFormat: 'comma', encode: false },
              );
              navigate(`${pages.projSearch}?${queryStr}`);
            }}
          >
            店舗
            {(orderBy as keyof SearchResult) === 'storeSortNumber' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        )}
        contractDate={'契約日'}
        projCompletedDate={'完工日'}
      />
    </TableHead>
  );
};