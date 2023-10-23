import { TableCell, TableRow } from '@mui/material';
import { ReactNode } from 'react';
import { KeyOfSearchResult } from '../../types';
import { styled } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';


const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: grey[50],
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
  deliveryDate,
  payFinDate,
  projFinDate,
  storeName,
  tel,
  lastBillDate,
  createdAt,
  updatedAt,
  projDataId,
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
        <br />
        {projDataId}
      </TableCell>

      <TableCell>
        {custNameKana}
        <br />
        {custName}
      </TableCell>

      <TableCell sx={{
        maxWidth: '200px',
      }}
      >
        {projName}
      </TableCell>

      <TableCell sx={{
        whiteSpace: 'nowrap',
      }}
      >
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
        {deliveryDate}
      </TableCell>

      <TableCell
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {lastBillDate}
      </TableCell>

      
      <TableCell
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {payFinDate}
      </TableCell>

      <TableCell
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {projFinDate}
      </TableCell>
      
      <TableCell 
        sx={{
          whiteSpace: 'nowrap',
          fontSize: 10,
          color: grey[500],
        }}
      >
        {createdAt}
        <br />
        {updatedAt}
      </TableCell>
    </StyledTableRow>
  );
};

export type RowLayoutProps = Parameters<typeof RowLayout>[0];