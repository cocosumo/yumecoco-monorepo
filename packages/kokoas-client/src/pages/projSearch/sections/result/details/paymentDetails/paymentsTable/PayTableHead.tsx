import { TableHead } from '@mui/material';
import { RowLayout } from './RowLayout';

export const PayTableHead = () => {
  return (
    <TableHead>
      <RowLayout 
        index={'No'}
        paymentStatus='状態'
        paymentType='項目'
        paymentMethod='入金区分'
        paymentDate='入金日'
        paymentAmount='金額'
        actualPaymentAmount='金額計'
        handlingFee='調整額'
        remarks='備考'
      />

    </TableHead>
  );
};