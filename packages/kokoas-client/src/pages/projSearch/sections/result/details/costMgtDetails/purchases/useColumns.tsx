import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
  ColumnDef,
} from '@tanstack/react-table';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { ReactNode, useMemo } from 'react';
import { GetCostMgtData, PaymentHistory, ProcurementSupplierDetails } from 'types';

type ColumnType = ColumnDef<ProcurementSupplierDetails>;

const findSameMonthPayment =  (paymentDate: string | null, month: string) => {
  const normalizedPaymentDate  = paymentDate || 'unknown'; 
  const parsePaymentDateToMonth = normalizedPaymentDate === 'unknown' ? normalizedPaymentDate : format(parseISO(normalizedPaymentDate), 'yyyyMM');
  return parsePaymentDateToMonth === month;
              
};

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
      
      const {
        months,
      } = costMgtData;

      const paymentDateColumns = months
        .map((month) => {
          const column: ColumnType[] = [
            {
              id: `${month}_amount`, 
              header: () => {

                let parsedDisplay;

                if (month === 'unknown') {
                  parsedDisplay = '未定';
                } else {
                  try {
                    parsedDisplay = format(parse(month, 'yyyyMM', new Date()), 'yyyy.MM');
                  } catch (e) {
                    console.warn(e);
                    parsedDisplay = 'エラー';
                  }
                }
              
                return (
                  <Typography align='right'>
                    {parsedDisplay}
                  </Typography>
                );
              },
              accessorKey: 'paymentHistory',
              cell: info => {
                const value = info.getValue() as PaymentHistory[] | undefined;
                if (!value) return '';

                const sameMonthPayments = value
                  .filter(({ paymentDate }) => findSameMonthPayment(paymentDate, month));

                if (!sameMonthPayments.length) return '';

                const amountValue = sameMonthPayments.reduce((acc, curr) => {
                  const paymentAmtBeforeTax = curr.paymentAmtBeforeTax || 0;
                  return acc + paymentAmtBeforeTax;
                }, 0).toLocaleString();

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


        });
        

      return [
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
              実行予算金額
            </BoldCell>),
          accessorKey: 'plannedBudgetCost',
          cell: info => {
            return (
              <Typography align='right'>
                {(info.getValue() as number || 0).toLocaleString()}
              </Typography>);
          },
          footer: props => props.column.id,
          size: 130,
        },
        {
          header: () => (
            <BoldCell align='right'>
              発注金額
            </BoldCell>),
          accessorKey: 'contractOrderCost',
          cell: info => {
            return (
              <BoldCell align='right'>
                {(info.getValue() as number || 0).toLocaleString()}
              </BoldCell>);
          },
          footer: props => props.column.id,
          size: 130,
          
        },
        ...paymentDateColumns.flatMap(column => column),
        {
          id: 'unpaidAmout',
          header: () => (
            <Typography align='right'>
              未払金
            </Typography>
          ),
          cell: info => {
            const row = info.row;

            const {
              totalPaidAmount = 0,
              plannedBudgetCost = 0,
            } = row.original;
            return (
              <Typography align='right'>
                {((plannedBudgetCost - totalPaidAmount) as number).toLocaleString()}
              </Typography>
            );
          },
          size: 130,
        },
     
      ];

    }, 
    [costMgtData],
  );
 

  return columns;

};