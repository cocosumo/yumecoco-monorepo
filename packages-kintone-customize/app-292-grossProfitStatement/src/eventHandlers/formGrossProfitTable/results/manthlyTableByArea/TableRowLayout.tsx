import { TableCell, TableRow } from '@mui/material';
import { ReactNode } from 'react';

export interface TableRowLayoutProps {
  label: ReactNode,
  shinchiku: ReactNode,
  reform: ReactNode,
  shinchikuhutai: ReactNode,
  taiyouko: ReactNode,
  others: ReactNode,
  total: ReactNode,
}



export const TableRowLayout = (props: TableRowLayoutProps) => {
  const {
    label,
    shinchiku,
    reform,
    shinchikuhutai,
    taiyouko,
    others,
    total,
  } = props;


  return (
    <TableRow>
      <TableCell align='left'>
        {label}
      </TableCell>
      <TableCell align='right'>
        {shinchiku}
      </TableCell>
      <TableCell align='right'>
        {reform}
      </TableCell>
      <TableCell align='right'>
        {shinchikuhutai}
      </TableCell>
      <TableCell align='right'>
        {taiyouko}
      </TableCell>
      <TableCell align='right'>
        {others}
      </TableCell>
      <TableCell align='right'>
        {total}
      </TableCell>
    </TableRow>
  );
};