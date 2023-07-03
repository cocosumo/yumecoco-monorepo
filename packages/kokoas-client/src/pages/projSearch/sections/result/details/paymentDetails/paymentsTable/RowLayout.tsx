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
  width,
}:{
  children: ReactNode,
  width?: number,
}) => (
  <TableCell 
    align='right' 
    width={width}
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
      <TableCell width={10}>
        {index}
      </TableCell>
      <TableCell 
        align='center'
        width={100}
      >
        {paymentStatus}
        <br />
        {paymentType}
      </TableCell>
      <TableCell width={100}>
        {paymentMethod}
      </TableCell>

      <TableCell width={100}>
        {paymentDate}
      </TableCell>

      <NumberCell width={100}>
        {actualPaymentAmount}
      </NumberCell>

      <NumberCell width={100}>
        {handlingFee}
      </NumberCell>

      <NumberCell width={100}>
        {paymentAmount}
      </NumberCell>

      <TableCell 
        width="auto"
        sx={{
          overflowWrap: 'anywhere',
        }}
      >
        {remarks}
      </TableCell>

    </StyledTableRow>
  );
};