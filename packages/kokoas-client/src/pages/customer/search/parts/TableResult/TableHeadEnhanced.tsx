import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Order } from 'types';
import { cellWidth, headCells, KSearchData } from './settings';



export const TableHeadEnhanced = ({
  order,
  orderBy,
  onRequestSort,
}: {
  orderBy: KSearchData
  order: Order,
  onRequestSort: (event: React.MouseEvent<unknown>, property: KSearchData) => void
}) => {

  const createSortHandler =  (property: KSearchData) =>
    (event: React.MouseEvent<unknown>) => {
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
};

/*
function EnhancedTableHead(props: EnhancedTableProps<keyof ISearchData>) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof ISearchData) => (event: React.MouseEvent<unknown>) => {
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
 */