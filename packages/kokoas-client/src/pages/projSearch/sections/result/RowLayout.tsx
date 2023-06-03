import { TableCell } from '@mui/material';
import { Fragment, ReactNode } from 'react';
import { SearchResult } from '../../api/search';

export const RowLayout = ({
  contractDate,
  custName,
  custAddress,
  custNameKana,
  projCompletedDate,
  storeName,
  tel,
} : Partial<Record<keyof SearchResult[number], ReactNode>>) => {
  return (
    <Fragment>
      <TableCell 
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {storeName}
      </TableCell>

      <TableCell>
        {custNameKana}
        <br />
        {custName}
      </TableCell>

      <TableCell>
        {custAddress}
      </TableCell>

      <TableCell 
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {tel}
      </TableCell>

      <TableCell>
        {contractDate}
      </TableCell>

      <TableCell>
        {projCompletedDate}
      </TableCell>
    </Fragment>
  );
};

export type RowLayoutProps = Parameters<typeof RowLayout>[0];