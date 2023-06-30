import { TableBody } from '@mui/material';
import { IAndpadpaymentdata } from 'types';
import { RowLayout } from './RowLayout';
import { PaymentStatus } from './PaymentStatus';



export const PayTableBody = ({
  records,
}: {
  records: IAndpadpaymentdata[]
}) => {

  return (
    <TableBody>
      {records.map((record, index) => {

        const {
          ID,
          handlingFee,
          paymentAmount,
          paymentMethod,
          paymentType,
          paymentDate,
          paymentStatus,
          //expectedPaymentAmount,
        
        } = record;

        const parsedHandlingFee = +handlingFee.value;
        const parsedPaymentAmount = +paymentAmount.value;

        const actualPaymentAmount = parsedPaymentAmount + parsedHandlingFee;

        return (
          <RowLayout 
            index={index + 1}
            key={ID.value}
            paymentStatus={<PaymentStatus paymentStatus={paymentStatus.value} />}
            paymentType={paymentType.value || '-'}
            paymentDate={paymentDate.value || '-'}
            paymentMethod={paymentMethod.value || '-'}
            paymentAmount={parsedPaymentAmount.toLocaleString() || '-'}
            handlingFee={parsedHandlingFee.toLocaleString() || '-'}
            actualPaymentAmount={actualPaymentAmount.toLocaleString() || '-'}
            remarks={'-'}
            
          />
        );
      })}
    </TableBody>
  );
};