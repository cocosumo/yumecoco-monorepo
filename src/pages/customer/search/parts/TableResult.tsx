
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { Grid, Button } from '@mui/material';
import {  useState } from 'react';

import { ISearchData as Data, ISearchData } from '../api/getSearchData';
import { DetailsDialog } from './detailsDialog/DetailsDialog';
import { getComparator } from '../../../../helpers/table';
import { TableResultContainer } from './TableResultContainer';




const headCells : (keyof Data)[][] = [
  ['顧客ID',  '顧客種別', '案件数' ],
  ['顧客氏名・会社名', '現住所'],
  ['店舗', 'ここすも営業', 'ここすも工事', 'ゆめてつAG'],
  ['登録日時', '更新日時'],
];

const cellWidth = [
  '',
  '30%',
  '25%',
  '',
];


function EnhancedTableHead(props: EnhancedTableProps<keyof Data>) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="normal">

        </TableCell>

        {headCells.map((headCellGroup, headIdx) => (
          <TableCell
            key={headCellGroup.join('-')}
            width={cellWidth[headIdx]}
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


export function TableResult({
  rows,
}: {
  rows: ISearchData[]
}) {
  //const { isSubmitting, values } = useFormikContext<typeof initialValues>();

  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof Data>('更新日時');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [detailsDialogState, setDetailsDialogState] = useState<{ open: boolean, custGroupdId: string }>();


  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
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

  /* const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  }; */

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Grid item xs={12} >

      <TableResultContainer>
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
                    key={row.顧客ID}
                  >
                    <TableCell padding="normal" width={'10%'}>
                      <Button
                        variant='outlined'
                        onClick={()=>{setDetailsDialogState({ open: true, custGroupdId: row.顧客ID.toString() });}}
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
      </TableResultContainer>

      <DetailsDialog
        open={Boolean(detailsDialogState?.open)}
        custGroupId={detailsDialogState?.custGroupdId}
        handleClose={()=> {setDetailsDialogState({ open: false, custGroupdId: '' });}} 
      />
    </Grid>
  );
}
