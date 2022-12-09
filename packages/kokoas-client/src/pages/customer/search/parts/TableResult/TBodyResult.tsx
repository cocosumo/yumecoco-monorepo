import { Button, TableBody, TableCell, TableRow } from '@mui/material';
import { getComparator } from 'kokoas-client/src/helpers/table';
import { useState } from 'react';
import { Order } from 'types';
import { DetailsDialog } from '../detailsDialog/DetailsDialog';
import { headCells, ISearchData, KSearchData } from './settings';

export const TBodyResult = ({
  rows,
  order,
  orderBy,
  rowsPerPage,
  page,
} :{
  rows: ISearchData[],
  order: Order,
  orderBy: KSearchData,
  rowsPerPage: number
  page: number,
}) => {
  const [detailsDialogState, setDetailsDialogState] = useState<{ open: boolean, custGroupdId: string }>();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (

    <TableBody>

      {rows?.slice().sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {

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
      <DetailsDialog
        open={Boolean(detailsDialogState?.open)}
        custGroupId={detailsDialogState?.custGroupdId}
        handleClose={()=> {setDetailsDialogState({ open: false, custGroupdId: '' });}}
      />
    </TableBody>
  );
};