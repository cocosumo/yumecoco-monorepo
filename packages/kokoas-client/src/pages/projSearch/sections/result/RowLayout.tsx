import { TableCell } from '@mui/material';
import { Fragment, ReactNode } from 'react';
import { KeyOfSearchResult } from '../../types';

export const RowLayout = ({
  contractDate,
  custName,
  projName,
  custNameKana,
  projCompletedDate,
  storeName,
  tel,
} : Partial<Record<KeyOfSearchResult, ReactNode>>) => {
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
        {projName}
      </TableCell>

      <TableCell>
        {tel}
      </TableCell>

      <TableCell 
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {contractDate}
      </TableCell>

      <TableCell>
        {projCompletedDate}
      </TableCell>
    </Fragment>
  );
};

export type RowLayoutProps = Parameters<typeof RowLayout>[0];