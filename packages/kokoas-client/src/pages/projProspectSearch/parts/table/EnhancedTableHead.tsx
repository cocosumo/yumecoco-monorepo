import { TableHead, TableRow, TableCell, TableSortLabel, Stack,
  //Box,
} from '@mui/material';
import { TKeyOfSearchResult } from '../../api/searchProject';
import { headCells, cellAlign } from './constants';
//import { visuallyHidden } from '@mui/utils';

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
          sx={{ verticalAlign: 'top', minWidth: '11em', fontWeight: 'bold' }}
          //width={cellWidth[headIdx]}
          >
            <Stack spacing={2} alignContent="flex-start">
              {headCellGroup.map((headCellItem) => (


                <TableSortLabel
                  key={headCellItem}
                  sx={{
                    flexDirection: cellAlign[colIdx] === 'right' ? 'row-reverse' : 'row',

                  }}
              //sx={{ display: 'inline-block' }}
                    active={orderBy === headCellItem}
                    direction={orderBy === headCellItem ? order : 'desc'}
                    onClick={createSortHandler(headCellItem)}
                  >
                  {headCellItem}
                  {/*             {orderBy === headCellItem ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null} */}

                </TableSortLabel>


              ))}

            </Stack>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};