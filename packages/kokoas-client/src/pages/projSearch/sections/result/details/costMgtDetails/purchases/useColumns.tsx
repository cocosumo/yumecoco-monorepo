import { Typography } from '@mui/material';
import {
  ColumnDef,
} from '@tanstack/react-table';
import differenceInMonths from 'date-fns/differenceInMonths';
import format from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';
import parseISO from 'date-fns/parseISO';
import subMonths from 'date-fns/subMonths';
import { ReactNode, useMemo } from 'react';
import { GetCostMgtData, PaymentHistory } from 'types';

type ColumnType = ColumnDef<GetCostMgtData['発注情報詳細'][number]>;

const BoldCell = ({
  children,
  align = 'left',
}:{
  children: ReactNode,
  align?: 'left' | 'center' | 'right',
}) => (<Typography fontWeight={700} align={align}>
  {children}
</Typography>);

export const useColumns = (costMgtData: GetCostMgtData) => {

  const columns = useMemo<ColumnType[]>(
    () => {
      const defaultPaymentColumns = 6;
      
      const {
        maxPaymentDate,
        minPaymentDate,
      } = costMgtData;


      const parsedMaxDate = maxPaymentDate ? parseISO(maxPaymentDate) : new Date(); 
      const parsedMinDate = maxPaymentDate ? parseISO(minPaymentDate) : new Date();

      const minMaxDateMonthDiff  = differenceInMonths(parsedMaxDate, parsedMinDate);

      const parsedPaymentColumsMonths = minMaxDateMonthDiff > defaultPaymentColumns ? minMaxDateMonthDiff : defaultPaymentColumns;

      const paymentDateColumns = Array.from(
        { length: parsedPaymentColumsMonths },
        (_, i) => {
          const currDateColumn = subMonths(parsedMaxDate, i);
          const formattedDateColumn = format(currDateColumn, 'yyyy/MM');

          const column: ColumnType[] = [
            {
              id: `${formattedDateColumn}_date`, // `yyyy/MM_date
              header: formattedDateColumn,
              accessorKey: 'paymentHistory',
              cell: info => {
                const value = info.getValue() as PaymentHistory[] | undefined;
                if (!value) return '';

                const sameMonthPayment = value.find(
                  ({ paymentDate }) => paymentDate && isSameMonth(currDateColumn, parseISO(paymentDate)),
                );

                if (!sameMonthPayment?.paymentDate) return '';

                return format(parseISO(sameMonthPayment.paymentDate), 'MM/dd');
                  
              },
              footer: props => props.column.id,
            },
            {
              id: `${formattedDateColumn}_amount`, 
              header: '金額',
              accessorKey: 'paymentHistory',
              cell: info => {
                const value = info.getValue() as PaymentHistory[] | undefined;
                if (!value) return '';

                const sameMonthPayment = value.find(
                  ({ paymentDate }) => paymentDate && isSameMonth(currDateColumn, parseISO(paymentDate)),
                );

                if (!sameMonthPayment?.paymentDate) return '';

                return sameMonthPayment.paymentAmountBeforeTax.toLocaleString();
              },
              footer: props => props.column.id,
            },
          ];

          return column;
        },
      );
      
        

      return [
        {
          header: '発注先',
          accessorKey: 'supplierName',
          cell: info => info.getValue(),
          footer: props => props.column.id,
          size: 200,
        },
        {
          header: () => (
            <BoldCell align='right'>
              発注金額
            </BoldCell>),
          accessorKey: 'orderAmountBeforeTax',
          cell: info => {
            return (
              <BoldCell align='right'>
                {(info.getValue() as number).toLocaleString()}
              </BoldCell>);
          },
          footer: props => props.column.id,
        },
        ...paymentDateColumns.flatMap(column => column),
     
      ];

    }, 
    [costMgtData],
  );
 

  return columns;

};