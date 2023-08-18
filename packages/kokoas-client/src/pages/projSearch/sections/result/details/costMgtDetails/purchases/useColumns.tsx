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
        .reverse()
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

                const sameMonthPayment = value
                  .find(({ paymentDate }) => findSameMonthPayment(paymentDate, month));

                if (!sameMonthPayment?.paymentDate) return '';

                const amountValue = sameMonthPayment.paymentAmtBeforeTax.toLocaleString();

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
        },
        ...paymentDateColumns.flatMap(column => column),
        {
          id: 'unpaidAmout',
          header: () => (
            <Typography align='right'>
              未入金
            </Typography>
          ),
          cell: info => {
            const row = info.row;
            const contractOrderCost: number = row.original.contractOrderCost || 0;
            const plannedBudgetCost: number = row.original.plannedBudgetCost || 0;
            return (
              <Typography align='right'>
                {((plannedBudgetCost - contractOrderCost || 0) as number).toLocaleString()}
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