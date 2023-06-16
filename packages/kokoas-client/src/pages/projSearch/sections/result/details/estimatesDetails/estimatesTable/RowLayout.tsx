import { TableCell, TableRow, Typography } from '@mui/material';
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
  majorItem,
  middleItem,
  material,
  materialRemarks,
  costPrice,
  quantity,
  unit,
  profitRate,
  unitPrice,
  amountAfterTax,
  remarks,
}:{
  majorItem: ReactNode,
  middleItem: ReactNode,
  material: ReactNode,
  materialRemarks: ReactNode,
  costPrice: ReactNode,
  quantity: ReactNode,
  unit: ReactNode,
  profitRate: ReactNode,
  unitPrice: ReactNode,
  amountAfterTax: ReactNode,
  remarks: ReactNode,
}) => {
  return (
    <StyledTableRow>
      <TableCell>
        {majorItem}
      </TableCell>
      <TableCell>
        {middleItem}
      </TableCell>
      <TableCell>
        <div>
          {material}
        </div>
        <Typography variant='caption'>
          {materialRemarks}
        </Typography>
      </TableCell>
      <NumberCell>
        {costPrice}
      </NumberCell>
      <NumberCell>
        {`${quantity} ${unit}`}
      </NumberCell>
      <NumberCell>
        {profitRate}
      </NumberCell>
      <NumberCell>
        {unitPrice}
      </NumberCell>
      <NumberCell>
        {amountAfterTax}
      </NumberCell>
      <TableCell>
        {remarks}
      </TableCell>
    </StyledTableRow>
  );
};