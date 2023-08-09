import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
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
              header: () => (
                <Typography align='center'>
                  {formattedDateColumn}
                </Typography>
              ),
              accessorKey: 'paymentHistory',
              cell: info => {
                const value = info.getValue() as PaymentHistory[] | undefined;
                if (!value) return '';

                const sameMonthPayment = value.find(
                  ({ paymentDate }) => paymentDate && isSameMonth(currDateColumn, parseISO(paymentDate)),
                );

                if (!sameMonthPayment?.paymentDate) return '';
                

                return (
                  <Typography align='center'>
                    {format(parseISO(sameMonthPayment.paymentDate), 'MM/dd')}
                  </Typography>
                ) ;
                  
              },
              footer: props => props.column.id,
            },
            {
              id: `${formattedDateColumn}_amount`, 
              header: () => (
                <Typography align='right'>
                  金額
                </Typography>
              ),
              accessorKey: 'paymentHistory',
              cell: info => {
                const value = info.getValue() as PaymentHistory[] | undefined;
                if (!value) return '';

                const sameMonthPayment = value.find(
                  ({ paymentDate }) => paymentDate && isSameMonth(currDateColumn, parseISO(paymentDate)),
                );

                if (!sameMonthPayment?.paymentDate) return '';

                const amountValue = sameMonthPayment.paymentAmountBeforeTax.toLocaleString();

                return (
                  <Typography align='right'>
                    {amountValue}
                  </Typography>
                );
              },
              footer: props => props.column.id,
            },
          ];

          return column;
        },
      );
      
        

      return [
        /*         {
          id: 'No',
          header: 'No',
          cell: info => info.row.index + 1,
          size: 20,
        }, */
        {
          id: 'supplierName',
          header: '発注先',
          accessorKey: 'supplierName',
          cell: info =>  {
            
           
            return (
              <Stack
                direction={'row'}
                spacing={1}
              >
                <Typography fontSize={12} color={grey[500]}>
                  {info.row.index + 1}
                </Typography>
                <Typography>
                  {String(info.getValue())}
                </Typography>
              </Stack>
            );
          },
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
        {
          header: () => (
            <Typography align='right'>
              未入金
            </Typography>
          ),
          accessorKey: '未入金',
          cell: info => {
            console.log('info', info.getValue());
            return (
              <Typography align='right'>
                {((info.getValue() || 0) as number).toLocaleString()}
              </Typography>
            );
          },
        },
     
      ];

    }, 
    [costMgtData],
  );
 

  return columns;

};