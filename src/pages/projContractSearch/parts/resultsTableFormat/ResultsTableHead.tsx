import { TableCell, TableCellProps, TableHead, TableRow } from '@mui/material';

const thCells = [
  ['projId', 'projEstimateId'],
  ['projName', 'projType'],
  ['store', 'yumeAg', 'cocoAg'],
  ['custName', 'contractDate'],
  ['contractAmount', 'grossProfit'],
] as const;

const getAlign = (idx: number): TableCellProps['align'] => {
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
  cell: typeof thCells[number]
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

export const ResultsTableHead = () => {

  return (
    <TableHead>
      <TableRow>
        {thCells.map((cell, idx) => (
          <RThCell cell={cell} idx={idx} key={cell[0]} />
        ))}
      </TableRow>
    </TableHead>
  );
};