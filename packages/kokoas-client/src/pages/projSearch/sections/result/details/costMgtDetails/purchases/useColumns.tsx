import {
  ColumnDef,
} from '@tanstack/react-table';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import subMonths from 'date-fns/subMonths';
import { useMemo } from 'react';
import { GetCostMgtData } from 'types';

type ColumnType = ColumnDef<GetCostMgtData['発注情報詳細'][number]>;

export const useColumns = (costMgtData: GetCostMgtData) => {

  const columns = useMemo<ColumnType[]>(
    () => {
      const defaultPaymentColumns = 6;
      
      const {
        maxPaymentDate,
        minPaymentDate,
        発注情報詳細: orderInfo,
      } = costMgtData;


      const normMaxDate = typeof maxPaymentDate === 'string' ? parseISO(maxPaymentDate) : maxPaymentDate || new Date(); 


      const paymentDateColumns = Array.from(
        { length: defaultPaymentColumns },
        (_, i) => {
          console.log('normMaxDate', normMaxDate);
          const currDateColumn = subMonths(normMaxDate, i);
          console.log('currDateColumn', normMaxDate);
          const formattedDateColumn = format(currDateColumn, 'yyyy/MM');
          console.log('formattedDateColumn', formattedDateColumn);


          const column: ColumnType = {
            id: formattedDateColumn,
            header: formattedDateColumn,
            footer: props => props.column.id,
            /*             columns: [
              {
                header: '支払日',
                accessorKey: 'paymentHistory',
                cell: info => {
                  console.log(info.getValue());
                  return undefined;
                },
                footer: props => props.column.id,
              },
              {
                header: '金額',
                accessorKey: `paymentHistory[${i}].paymentAmountBeforeTax`,
                cell: info => info.getValue(),
                footer: props => props.column.id,
              },
            ], */
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