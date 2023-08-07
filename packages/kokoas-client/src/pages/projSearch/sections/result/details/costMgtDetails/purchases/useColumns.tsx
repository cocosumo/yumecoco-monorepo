import {
  ColumnDef,
} from '@tanstack/react-table';
import differenceInMonths from 'date-fns/differenceInMonths';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import subMonths from 'date-fns/subMonths';
import { useMemo } from 'react';
import { GetCostMgtData, PaymentHistory } from 'types';

type ColumnType = ColumnDef<GetCostMgtData['発注情報詳細'][number]>;

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


          const column: ColumnType = {
            id: formattedDateColumn,
            header: formattedDateColumn,
            footer: props => props.column.id,
            columns: [
              {
                header: '日付',
                accessorKey: 'paymentHistory',
                cell: info => {
                  const value = info.getValue() as PaymentHistory;
                  console.log(paymentDate, info.getValue());
                  return value?.[0]?.paymentDate;
                },
                footer: props => props.column.id,
              },
              {
                header: '金額',
                accessorKey: `paymentHistory[${i}].paymentAmountBeforeTax`,
                cell: info => info.getValue(),
                footer: props => props.column.id,
              },
            ],
          };

          return column;
        },
      );
      
        

      return [
        {
          header: '発注先',
          accessorKey: 'supplierName',
          cell: info => info.getValue(),
          footer: props => props.column.id,
        },
        {
          header: '発注金額',
          accessorKey: 'orderAmountBeforeTax',
          cell: info => info.getValue(),
          footer: props => props.column.id,
        },
        ...paymentDateColumns,
      /*{
    header: '発注金がk',
    footer: props => props.column.id,
     columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: props => props.column.id,
      },
      {
        header: 'More Info',
        columns: [
          {
            accessorKey: 'visits',
            header: () => (<span>
              Visits
            </span>),
            footer: props => props.column.id,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            footer: props => props.column.id,
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: props => props.column.id,
          },
        ],
      },
    ], 
  },*/
      ];

    }, 
    [costMgtData],
  );
 

  return columns;

};