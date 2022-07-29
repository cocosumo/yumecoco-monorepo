import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material';
import { Box } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { useState } from 'react';
import { getComparator } from '../../../../helpers/table';
import { TKeyOfSearchResult, TSearchResult } from '../../api/searchProject';

const headCells : (TKeyOfSearchResult)[][] = [
  ['顧客番号', '工事番号'],
  ['顧客名', '工事名'],
  ['店舗名', 'ここすもAG', 'ゆめてつAG', 'ここすも工事'],
  ['更新日時', '作成日時', '更新者'],
];




function EnhancedTableHead(props: EnhancedTableProps<TKeyOfSearchResult>) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: TKeyOfSearchResult) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="normal">

        </TableCell>

        {headCells.map((headCellGroup) => (
          <TableCell
          key={headCellGroup.join('-')}
          //width={cellWidth[headIdx]}
          >
            {headCellGroup.map((headCellItem) => (

              <TableSortLabel
              sx={{ display: 'block' }}
              key={headCellItem}
              active={orderBy === headCellItem}
              direction={orderBy === headCellItem ? order : 'asc'}
              onClick={createSortHandler(headCellItem)}
            >
                {headCellItem}
                {orderBy === headCellItem ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>

            ))}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export const TableResult = ({
  list,
}: {
  list: TSearchResult
}) => {
  //const { isSubmitting, values } = useFormikContext<TypeOfForm>();
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<TKeyOfSearchResult>('更新日時');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rows = list;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: TKeyOfSearchResult,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


  console.log('LIST', list);

  return (
    <Grid item xs={12} md={10}>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer >
            <TablePagination
              labelRowsPerPage="表示件数を変更"
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
              <EnhancedTableHead
              order={order}
              orderBy={orderBy as string}
              onRequestSort={handleRequestSort}
            />
              <TableBody>
                {/* if we need to support IE11, replace
                rows.slice().sort(getComparator(order, orderBy)) with `stableSort` */}
                {rows?.slice().sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow

                      hover
                      tabIndex={-1}
                      key={row.顧客番号 + row.工事番号}

                    >
                        <TableCell padding="normal" width={'10%'}>
                          <Button
                            variant='outlined'
                            //onClick={()=>{setDetailsDialogState({ open: true, custGroupdId: row.顧客ID.toString() });}}
                          >
                            詳細
                          </Button>
                        </TableCell>
                        {headCells.map(headCellGroup => (
                          <TableCell
                          key={headCellGroup.join('-')}
                          id={labelId}
                          scope="row"
                          padding="normal"

                        >
                            {headCellGroup.map(headCellItem => (

                              <div key={headCellItem}>

                                {row[headCellItem] }
                                {!row[headCellItem] && '-'}
                              </div>

                            ))}


                          </TableCell>

                        ))}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows, //(dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>

      </Box>
      {/*       <DetailsDialog
      open={Boolean(detailsDialogState?.open)}
      custGroupId={detailsDialogState?.custGroupdId}
      handleClose={()=> {setDetailsDialogState({ open: false, custGroupdId: '' });}}/> */}
    </Grid>
  );

};