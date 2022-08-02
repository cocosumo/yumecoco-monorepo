import { TableHead, TableRow, TableCell, TableSortLabel,
  Box,
} from '@mui/material';
import { TKeyOfSearchResult } from '../../api/searchProject';
import { headCells, cellAlign } from './constants';
import { visuallyHidden } from '@mui/utils';

export const EnhancedTableHead = (props: EnhancedTableProps<TKeyOfSearchResult>) => {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: TKeyOfSearchResult) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>


        {headCells.map((headCellGroup, colIdx) => (
          <TableCell
          key={headCellGroup.join('-')}
          align = { cellAlign[colIdx]}
          //width={cellWidth[headIdx]}
          >
            {headCellGroup.map((headCellItem) => (
              <div key={headCellItem}>

                <TableSortLabel
              //sx={{ display: 'inline-block' }}
                    active={orderBy === headCellItem}
                    direction={orderBy === headCellItem ? order : 'desc'}
                    onClick={createSortHandler(headCellItem)}
                  >
                  {headCellItem}
                  {orderBy === headCellItem ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}

                </TableSortLabel>
                <br />
              </div>

            ))}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};