import { IconButton, TableCell } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const RowOrderControls = ({
  rowIdx,
}: {
  rowIdx: number

}) => {

  const isAtTop = rowIdx === 0;

  return (
    <TableCell size='small' sx={{
      pl: 1, pr: 0,
    }}
    >
      <IconButton size='small' disabled={isAtTop}>
        <KeyboardArrowUpIcon />
      </IconButton>

      <IconButton size='small'>
        <KeyboardArrowDownIcon />
      </IconButton>
    </TableCell>

  );
};