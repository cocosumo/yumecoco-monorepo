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
  invoiceStatus,
  projName,
  storeName,
  cocoAgName,
  supplierName,
  invoiceSystemNumber,
  orderAmount,
  paymentAmount,
  invoiceDate,
  createdAt,
  updatedAt,
}: Partial<Record<KeyOfSearchResult, ReactNode>>) => {
  return (
    <StyledTableRow>
      <TableCell
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {invoiceStatus}
      </TableCell>

      <TableCell sx={{
        minWidth: '200px',
      }}
      >
        {projName}
        <br />
        {storeName}
        <br />
        {cocoAgName}
      </TableCell>

      <TableCell sx={{
        minWidth: '150px',
        maxWidth: '200px',
      }}
      >
        {supplierName}
        <br />
        {invoiceSystemNumber}
      </TableCell>

      <TableCell align='right' 
        sx={{
          whiteSpace: 'nowrap',
          maxWidth: '200px',
        }}
      >
        {orderAmount}
        <br />
        {paymentAmount}
      </TableCell>

      <TableCell
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {invoiceDate}
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