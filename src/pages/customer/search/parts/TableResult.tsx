
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { Grid, Button } from '@mui/material';
import { useAdvancedSearchCustGroup } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';

interface Data {
  '顧客ID': string,
  '状況': string,
  '顧客種別': string,
  '顧客氏名/会社名': string,
  '現住所': string,
  '店舗': string,
  'ここすも営業': string,
  'ここすも工事': string,
  '登録日時': string,
  '更新日時': string,
}

const rows : Data[]  = [
  { '顧客ID': '12345', '状況': '999', '顧客種別': 'test', '顧客氏名/会社名': 'test', '現住所': 'test',  '店舗': 'test店',
    'ここすも営業': 'あ', 'ここすも工事': 'test', '登録日時': '2021-12-01', '更新日時': '2021-11-5',
  },
  { '顧客ID': '22345', '状況': '999', '顧客種別': 'test', '顧客氏名/会社名': 'test', '現住所': 'test',  '店舗': 'test店',
    'ここすも営業': 'か', 'ここすも工事': 'test', '登録日時': '2021-12-01', '更新日時': '2022-10-5',
  },
  { '顧客ID': '69999', '状況': '999', '顧客種別': 'test', '顧客氏名/会社名': 'test', '現住所': 'test',  '店舗': 'test店',
    'ここすも営業': 'さ', 'ここすも工事': 'test', '登録日時': '2021-12-01', '更新日時': '2022-10-5',
  },

];

const headCells : (keyof Data)[] = ['顧客ID', '状況', '顧客種別', '顧客氏名/会社名', '現住所', '店舗', 'ここすも営業', 'ここすも工事', '登録日時', '更新日時'];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
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
        {headCells.map((headCell) => (
          <TableCell
            key={headCell}
            sortDirection={orderBy === headCell ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell}
              direction={orderBy === headCell ? order : 'asc'}
              onClick={createSortHandler(headCell)}
            >
              {headCell}
              {orderBy === headCell ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


export function TableResult() {
  const data = useAdvancedSearchCustGroup({ storeId: '7' });
  const { isSubmitting } = useFormikContext();

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('更新日時');

  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  /* const [rows, setRows] = useState<Data[]>();

  useEffect(()=>{
    if (!isSubmitting && data){
      setRows(data.map(({
        $id, storeName, members,
      }) => {
        const { address, customerName } = members.value[0].value;
        return {
          '顧客ID': $id.value,
          '状況': 'XXX',
          '店舗': storeName.value,
          '顧客種別': '個人',
          '現住所': address.value,
          '顧客氏名/会社名': customerName.value,

        };
      }));
    }
  }, [isSubmitting]); */


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

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Grid item xs={12} >
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <TablePagination
              labelRowsPerPage="表示件数を変更"
              rowsPerPageOptions={[5, 10, 25]}
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
            size={dense ? 'small' : 'medium'}
          >
              <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                {rows.slice().sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow

                      hover
                      tabIndex={-1}
                      key={row.顧客ID}

                    >
                        <TableCell padding="normal">
                          <Button variant='outlined'>詳細</Button>
                        </TableCell>
                        <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                          {row.顧客ID}
                        </TableCell>
                        <TableCell align="right">{row.状況}</TableCell>
                        <TableCell align="right">{row['顧客種別']}</TableCell>
                        <TableCell align="right">{row['顧客氏名/会社名']}</TableCell>
                        <TableCell align="right">{row['現住所']}</TableCell>
                        <TableCell align="right">{row['店舗']}</TableCell>
                        <TableCell align="right">{row['ここすも営業']}</TableCell>
                        <TableCell align="right">{row['ここすも工事']}</TableCell>
                        <TableCell align="right">{row['登録日時']}</TableCell>
                        <TableCell align="right">{row['更新日時']}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>
        <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="密なパディング"
      />
      </Box>
    </Grid>
  );
}
