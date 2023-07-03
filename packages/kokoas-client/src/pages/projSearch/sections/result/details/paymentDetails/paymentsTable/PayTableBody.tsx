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
            remarks={'=%E6%A1%88%E4%BB%B6%E7%AE%A1%E7%90%86ID%20%3D%20b5dbc86d-fd61-47c1-9af4-f045e59b0ab0&series=%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0ID%2C%E9%A1%A7%E5%AE%A2ID%2C%E9%A1%A7%E5%AE%A2%E7%AE%A1%E7%90%86ID%2C%E9%A1%A7%E5%AE%A2%E5%90%8D%2C%E9%A1%A7%E5%AE%A2%E5%90%8D%EF%BC%88%E3%82%AB%E3%83%8A%EF%BC%89%2C%E9%A1%A7%E5%AE%A2%E9%83%B5%E4%BE%BF%E7%95%AA%E5%8F%B7%2C%E9%A1%A7%E5%AE%A2%E7%8F%BE%E4%BD%8F%E6%89%80%2C%E9%A1%A7%E5%AE%A2%E6%8B%'}
          />
        );
      })}
    </TableBody>
  );
};