import { TableBody } from '@mui/material';
import { IAndpadpaymentdata } from 'types';
import { RowLayout } from './RowLayout';
import { PaymentStatus } from './PaymentStatus';
import { IOrder } from './PayTableHead';
import { useMemo } from 'react';
import format from 'date-fns/format';
import { faker } from '@faker-js/faker/locale/ja';

export const PayTableBody = ({
  records,
  orderDetails,
}: {
  records: IAndpadpaymentdata[],
  orderDetails: IOrder
}) => {

  const {
    order,
    orderBy,
  } = orderDetails;

  const parsedRecords = useMemo(() => {
    return records
      .map((record) => {

        const {
          ID,
          //handlingFee,
          //paymentAmount,
          paymentMethod,
          paymentType,
          //paymentDate,
          paymentStatus,
          //expectedPaymentAmount,
        
        } = record;

        const parsedHandlingFee = Math.floor(Math.random() * 1000) + 100;
        const parsedPaymentAmount = Math.floor(Math.random() * 1000000) + 1000;

        const actualPaymentAmount = parsedPaymentAmount + parsedHandlingFee;

        // random number from 1000 to 1000000
        //const actualPaymentAmount = Math.floor(Math.random() * 1000000) + 1000;

        // random date string from 2020/01/01 to 2099/12/31
        const paymentDate = new Date(
          Math.floor(Math.random() * (4102444800000 - 1577836800000 + 1)) + 1577836800000,
        );

        return {
          key: ID.value,
          paymentStatus: paymentStatus.value,
          paymentType: paymentType.value,
          paymentDate: format(paymentDate, 'yyyy/MM/dd'),
          paymentMethod: paymentMethod.value,
          paymentAmount: parsedPaymentAmount,
          actualPaymentAmount,
          handlingFee: parsedHandlingFee,
          // random japanese string
          remarks: faker.lorem.sentences(2),
        };

         
      })
    ;

  }, [records]);


  return (
    <TableBody>
      {parsedRecords.sort((a, b) => {
        const isAsc = order === 'asc';
    
        switch (orderBy) {
          case 'paymentStatus':
          case 'paymentType':
          case 'paymentMethod':
          case 'paymentDate':
          case 'remarks':
            return String(a[orderBy])
              .localeCompare(String(b[orderBy]), 'ja', { sensitivity: 'base' }) * (isAsc ? 1 : -1);
          case 'paymentAmount':
          case 'actualPaymentAmount':
          case 'handlingFee':
            // compare numbers
            return (a[orderBy] - b[orderBy]) * (isAsc ? 1 : -1);
          default:
            return 0;
        }
      })
        .map(({
          key,
          actualPaymentAmount,
          handlingFee,
          paymentAmount,
          paymentDate,
          paymentMethod,
          paymentStatus,
          paymentType,
          remarks,
        }, index) => (
          <RowLayout 
            index={index + 1}
            key={key}
            paymentStatus={<PaymentStatus paymentStatus={paymentStatus} />}
            paymentType={paymentType || '-'}
            paymentDate={paymentDate || '-'}
            paymentMethod={paymentMethod || '-'}
            paymentAmount={paymentAmount.toLocaleString() || '-'}
            handlingFee={handlingFee.toLocaleString() || '-'}
            actualPaymentAmount={actualPaymentAmount.toLocaleString() || '-'}
            remarks={remarks}
          />
        ))}
    </TableBody>
  );
};

