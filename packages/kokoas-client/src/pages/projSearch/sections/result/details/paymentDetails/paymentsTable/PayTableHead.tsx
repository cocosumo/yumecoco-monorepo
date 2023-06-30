import { TableHead } from '@mui/material';
import { RowLayout } from './RowLayout';

export const PayTableHead = () => {
  return (
    <TableHead>
      <RowLayout 
        paymentMethod='入金区分'
        paymentDate='入金日'
        expectedPaymentAmount='金額'
        paymentAmount='金額計'
        handlingFee='調整額'
        remarks='備考'
      />

    </TableHead>
  );
};