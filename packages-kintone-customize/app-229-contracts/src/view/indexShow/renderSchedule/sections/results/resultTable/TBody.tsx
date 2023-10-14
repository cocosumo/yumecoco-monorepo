import { TableBody } from '@mui/material';

import { MonthRow } from './MonthRow';

const fiscalMonths = [
  12,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
];

export const TBody = () => {




  return (
    <TableBody>
      {fiscalMonths
        .map((month) => {
          return (
            <MonthRow month={month} key={month}  />
          );
        })}
     

    </TableBody>);
};