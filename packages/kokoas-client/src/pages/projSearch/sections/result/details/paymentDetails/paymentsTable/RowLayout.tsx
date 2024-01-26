import { TableCell, TableRow, Tooltip } from '@mui/material';
import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { amber, blue } from '@mui/material/colors';

export interface RowLayoutProps {
  index?: ReactNode,
  paymentStatus?: ReactNode,
  paymentType?: ReactNode,
  paymentDate: ReactNode,
  paymentMethod: ReactNode,
  paymentAmount: ReactNode,
  actualPaymentAmount: ReactNode,
  handlingFee: ReactNode,
  billingDate?: ReactNode,
  remarks: ReactNode,
}

export type KRowLayoutProps = keyof RowLayoutProps; 

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
  billingDate,
  remarks,
}:{
  index?: ReactNode,
  billingDate?: ReactNode,
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
      <TableCell width={120}>
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

      <TableCell width={100}>
        {billingDate}
      </TableCell>
      
      <NumberCell width={100}>
        {paymentAmount}
      </NumberCell>

      <Tooltip title="開発中のため、備考は閲覧不可です。当面、備考はAndpad上でご確認ください。">
        <TableCell 
          width="auto"
          sx={{
            overflowWrap: 'anywhere',
          }}
        >
          {remarks}
        </TableCell>
      </Tooltip>

    </StyledTableRow>
  );
};