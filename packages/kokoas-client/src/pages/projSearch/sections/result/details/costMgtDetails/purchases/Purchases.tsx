import { useMemo } from 'react';
import './index.css';

import {
  getCoreRowModel,
  flexRender,
  useReactTable,
} from '@tanstack/react-table';
import { GetCostMgtData } from 'types';
import { useColumns } from './useColumns';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { PurchasesTableContainer } from './PurchasesTableContainer';


export const Purchases = ({
  costMgtData,
}:{
  costMgtData: GetCostMgtData
}) => {
  const {
    発注情報詳細: orderInfo,
  } = costMgtData;

  const data = useMemo(() => orderInfo, [orderInfo]);

  const columns = useColumns(costMgtData);

  console.log(data);

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    enablePinning: true,

  });
  return (
    <PurchasesTableContainer 
      width={table.getTotalSize()}
    >
      <TableHead>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <TableCell
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize() }}
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
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map(row => {
          return (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => {
                return (
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </PurchasesTableContainer>
  );
};

