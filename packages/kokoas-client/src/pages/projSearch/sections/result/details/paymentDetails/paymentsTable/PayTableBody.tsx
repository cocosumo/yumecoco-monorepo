import { TableBody } from '@mui/material';
import { IAndpadpaymentdata } from 'types';
import { RowLayout } from './RowLayout';

export const PayTableBody = ({
  records,
}: {
  records: IAndpadpaymentdata[]
}) => {

  return (
    <TableBody>
      {records.map(({
        ID,
      }) => {
        return (
          <RowLayout 
            key={ID.value}
            expectedPaymentAmount={0}
            paymentDate={0}
            paymentMethod={0}
            paymentAmount={0}
            handlingFee={0}
            remarks={0}
            
          />
        );
      })}
    </TableBody>
  );
};