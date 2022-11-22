import { Table, TablePagination } from '@mui/material';
import { ComponentProps, useEffect, useState } from 'react';
import { Order } from 'types';
import { ISearchData, KSearchData, RowsPerPageOption, rowsPerPageOptions } from './settings';
import { TableHeadEnhanced } from './TableHeadEnhanced';
import { TableResultContainer } from './TableResultContainer';
import { TBodyResult } from './TBodyResult';

export const TableResult = ({
  rows,
}: {
  rows: ISearchData[]
}) => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<KSearchData>('更新日時');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPageOption>(100);

  useEffect(() => setPage(0), [rows.length, rowsPerPage]);

  const handleChangePage: ComponentProps<typeof TablePagination>['onPageChange'] = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage: ComponentProps<typeof TablePagination>['onRowsPerPageChange'] = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleRequestSort: ComponentProps<typeof TableHeadEnhanced>['onRequestSort'] = (
    _,
    property,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  return (
    <TableResultContainer>
      <TablePagination
        showLastButton
        showFirstButton
        labelRowsPerPage="表示件数を変更"
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={(page > 0 && rows.length < rowsPerPage) ? 0 : page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Table
        sx={{ minWidth: 750 }}
        size="small"
      >
        <TableHeadEnhanced
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TBodyResult
          order={order}
          orderBy={orderBy}
          page={page}
          rows={rows}
          rowsPerPage={rowsPerPage}
        />

      </Table>
    </TableResultContainer>
  );
};