import { TableCell, TableCellProps, TableHead, TableRow } from '@mui/material';
import { translations } from '../../../../helpers/translations';

export const headCells = [
  ['projId', 'projEstimateId'],
  ['projName', 'projType'],
  ['store', 'yumeAg', 'cocoAg'],
  ['custName', 'contractDate'],
  ['contractAmount', 'grossProfit'],
] as const;

export const getAlign = (idx: number): TableCellProps['align'] => {
  switch (idx) {
    case 4:
      return 'right';
    default:
      return 'left';
  }
};

const RThCell = ({
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
          {translations[field]}
        </div>
      ))}
    </TableCell>
  );
};

export const ResultsTHead = () => {

  return (
    <TableHead>
      <TableRow>
        {headCells.map((cell, idx) => (
          <RThCell cell={cell} idx={idx} key={cell[0]} />
        ))}
        <TableCell align='right'>

        </TableCell>
      </TableRow>
    </TableHead>
  );
};