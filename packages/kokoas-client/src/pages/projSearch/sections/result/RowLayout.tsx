import { TableCell } from '@mui/material';
import { ReactNode } from 'react';
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
    <>
      <TableCell>
        {custName}
        <br />
        {custNameKana}
      </TableCell>
      <TableCell>
        {tel}
        <br />
        {custAddress}
      </TableCell>
      <TableCell>
        {storeName}
      </TableCell>
      <TableCell>
        {contractDate}
      </TableCell>
      <TableCell>
        {projCompletedDate}
      </TableCell>
    </>
  );
};

export type RowLayoutProps = Parameters<typeof RowLayout>[0];