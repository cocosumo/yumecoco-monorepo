import { useMemo } from 'react';
import './index.css';

import {
  getCoreRowModel,
  ColumnDef,
  flexRender,
  useReactTable,
} from '@tanstack/react-table';
import { GetCostMgtData } from 'types';

const columns: ColumnDef<GetCostMgtData['発注情報詳細']['orderInfo'][number]>[] = [
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

export const Purchases = ({
  costMgtData,
}:{
  costMgtData: GetCostMgtData
}) => {
  const {
    発注情報詳細: {
      orderInfo,
    },
  } = costMgtData;

  const data = useMemo(() => orderInfo, [orderInfo]);

  console.log('orderInfo', data);

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="p-2 block max-w-full overflow-x-scroll overflow-y-hidden">
      <div className="h-2" />
      <table className="w-full ">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ position: 'relative', width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resizer ${
                          header.column.getIsResizing() ? 'isResizing' : ''
                        }`}
                      ></div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
};

