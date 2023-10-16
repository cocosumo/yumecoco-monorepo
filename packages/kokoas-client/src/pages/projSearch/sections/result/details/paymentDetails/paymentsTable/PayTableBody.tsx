import { Chip, TableBody, Tooltip } from '@mui/material';
import { IAndpadpayments } from 'types';
import { RowLayout } from './RowLayout';
import { PaymentStatus } from './PaymentStatus';
import { IOrder } from './PayTableHead';
import { useMemo } from 'react';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const PayTableBody = ({
  projId,
  records,
  orderDetails,
}: {
  projId: string,
  records: IAndpadpayments[],
  orderDetails: IOrder
}) => {

  const {
    order,
    orderBy,
  } = orderDetails;

  const {
    data: projRec,
  } = useProjById(projId);

  const {
    lastBillingDate,
  } = projRec || {};

  const parsedRecords = useMemo(() => {
    return records
      .map((record) => {

        const {
          ID,
          handlingFee,
          paymentAmount,
          paymentMethod,
          paymentType,
          paymentDate,
          paymentStatus,
          billingDate,
          //expectedPaymentAmount,
        
        } = record;

        const parsedHandlingFee = +handlingFee.value;
        const parsedPaymentAmount = +paymentAmount.value;

        const actualPaymentAmount = parsedPaymentAmount + parsedHandlingFee;

        return {
          key: ID.value,
          paymentStatus: paymentStatus.value,
          paymentType: paymentType.value,
          paymentDate: paymentDate.value,
          paymentMethod: paymentMethod.value,
          billingDate: billingDate.value,
          paymentAmount: parsedPaymentAmount,
          actualPaymentAmount,
          handlingFee: parsedHandlingFee,
          // random japanese string
          remarks: '-',
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
          case 'billingDate':
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
          billingDate,
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
            billingDate={lastBillingDate?.value === billingDate 
              ? (<Tooltip title='最終請求日'>
                <Chip 
                  label={billingDate} 
                  size='small'
                  icon={<CheckCircleIcon color='success' />}
                />
              </Tooltip>
              ) 
              : billingDate || '-'}
            paymentAmount={paymentAmount.toLocaleString() || '-'}
            handlingFee={handlingFee.toLocaleString() || '-'}
            actualPaymentAmount={actualPaymentAmount.toLocaleString() || '-'}
            remarks={remarks}
          />
        ))}
    </TableBody>
  );
};

