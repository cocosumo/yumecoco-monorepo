import { TableCell, TableRow } from '@mui/material';
import { ReactNode } from 'react';
import { KeyOfSearchResult } from '../../types';
import { styled } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';


const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: green[50],
  },
  '&:nth-of-type(odd)': {
    backgroundColor: 'white',
  },
  // hide last border
  '&:last-child td': {
    border: 0,
  },

  '&:hover': {
    backgroundColor: blue[50],
  },
}));

export const RowLayout = ({
  contractDate,
  custName,
  projName,
  custNameKana,
  projCompletedDate,
  storeName,
  tel,
  onClick,
} : Partial<Record<KeyOfSearchResult, ReactNode>> & {
  onClick?: () => void,
}) => {
  return (
    <StyledTableRow onClick={onClick} sx={{
      cursor: onClick ? 'pointer' : 'default',
    }}
    >
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

      <TableCell
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {projCompletedDate}
      </TableCell>
    </StyledTableRow>
  );
};

export type RowLayoutProps = Parameters<typeof RowLayout>[0];