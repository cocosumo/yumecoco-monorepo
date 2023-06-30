import { TableCell, TableRow } from '@mui/material';
import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { amber, blue } from '@mui/material/colors';


const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: amber[50],
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

const NumberCell = ({
  children,
}:{
  children: ReactNode
}) => (
  <TableCell 
    align='right' 
    sx={{
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </TableCell>
);

export const RowLayout = ({
  expectedPaymentAmount,
  paymentDate,
  paymentMethod,
  paymentAmount,
  handlingFee,
  remarks,
}:{
  expectedPaymentAmount: ReactNode,
  paymentDate: ReactNode,
  paymentMethod: ReactNode,
  paymentAmount: ReactNode,
  handlingFee: ReactNode,
  remarks: ReactNode,
}) => {
  return (
    <StyledTableRow>
      <NumberCell>
        {expectedPaymentAmount}
      </NumberCell>
      <TableCell>
        {paymentDate}
      </TableCell>
      <TableCell>
        {paymentMethod}
      </TableCell>
      <NumberCell>
        {paymentAmount}
      </NumberCell>
      <NumberCell>
        {handlingFee}
      </NumberCell>
      <TableCell>
        {remarks}
      </TableCell>
    </StyledTableRow>
  );
};