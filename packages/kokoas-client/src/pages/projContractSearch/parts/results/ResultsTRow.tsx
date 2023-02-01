import { IconButton, TableCell, TableRow } from '@mui/material';
import { getAlign, headCells } from './ResultsTHead';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const RTCell = ({
  cell,
  idx,
}: {
  cell: typeof headCells[number]
  idx: number,
}) => {
  return (
    <TableCell align={getAlign(idx)}>
      {cell.map((field) => (
        <div key={field}>
          {field}
        </div>
      ))}
    </TableCell>
  );
};

export const ResultsTRow = () => {
  return (
    <TableRow>
      {headCells.map((cell, idx) => (
        <RTCell cell={cell} idx={idx} key={cell[0]} />
      ))}
      <TableCell align='right'>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};