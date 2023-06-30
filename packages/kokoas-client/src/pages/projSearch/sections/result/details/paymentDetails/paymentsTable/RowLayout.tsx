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
  index,
  paymentStatus,
  paymentType,
  paymentDate,
  paymentMethod,
  paymentAmount,
  actualPaymentAmount,
  handlingFee,
  remarks,
}:{
  index?: ReactNode,
  paymentStatus?: ReactNode,
  paymentType?: ReactNode,
  paymentDate: ReactNode,
  paymentMethod: ReactNode,
  paymentAmount: ReactNode,
  actualPaymentAmount: ReactNode,
  handlingFee: ReactNode,
  remarks: ReactNode,
}) => {
  return (
    <StyledTableRow>
      <TableCell
        sx={{
          maxWidth: '10px',
        }}
      >
        {index}
      </TableCell>
      <TableCell 
        align='center'
        sx={{
          maxWidth: '50px',
        }}
      >
        {paymentStatus}
        <br />
        {paymentType}
      </TableCell>
      <TableCell>
        {paymentMethod}
      </TableCell>

      <TableCell>
        {paymentDate}
      </TableCell>

      <NumberCell>
        {actualPaymentAmount}
      </NumberCell>

      <NumberCell>
        {handlingFee}
      </NumberCell>

      <NumberCell>
        {paymentAmount}
      </NumberCell>

      <TableCell>
        {remarks}
      </TableCell>

    </StyledTableRow>
  );
};