import {
  ColumnDef,
} from '@tanstack/react-table';
import { GetCostMgtData } from 'types';

export const useColumns = (costMgtData: GetCostMgtData) => {

  const {
    発注情報詳細: orderInfo,
  } = costMgtData;

  const columns: ColumnDef<GetCostMgtData['発注情報詳細'][number]>[] = [
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

  return columns;

};