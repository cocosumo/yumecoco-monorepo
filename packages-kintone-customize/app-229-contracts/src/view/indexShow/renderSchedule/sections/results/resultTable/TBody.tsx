import { TableBody, TableCell, TableRow } from '@mui/material';
import { Fragment } from 'react';
import { MonthHeader } from './MonthHeader';

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
      {fiscalMonths.map((month) => {

        return (
          <Fragment key={month}>
            <TableRow>
              <MonthHeader month={month} />
              
              <TableCell rowSpan={3} />

              <TableCell>
                目標値
              </TableCell>

              <TableCell>
                111
              </TableCell>

              <TableCell>
                222
              </TableCell>

              <TableCell>
                333
              </TableCell>

              <TableCell>
                444
              </TableCell>

              <TableCell>
                555
              </TableCell>

              <TableCell>
                666
              </TableCell>

              <TableCell rowSpan={3} />
              <TableCell rowSpan={3} />

              <TableCell>
                -
              </TableCell>
 
              <TableCell rowSpan={3} />


            </TableRow>

            {/*行事/イベント  */}
            <TableRow >
              <TableCell>
                昨年実績値
              </TableCell>
              <TableCell>
                111
              </TableCell>

              <TableCell>
                222
              </TableCell>

              <TableCell>
                333
              </TableCell>

              <TableCell>
                444
              </TableCell>

              <TableCell>
                555
              </TableCell>

              <TableCell>
                666
              </TableCell>

              <TableCell>
                -
              </TableCell>
 
              
            </TableRow>

            <TableRow >
              <TableCell>
                実績値
              </TableCell>
              <TableCell>
                111
              </TableCell>

              <TableCell>
                222
              </TableCell>

              <TableCell>
                333
              </TableCell>

              <TableCell>
                444
              </TableCell>

              <TableCell>
                555
              </TableCell>

              <TableCell>
                666
              </TableCell>


              <TableCell>
                -
              </TableCell>


            </TableRow>

          </Fragment>
        );
      })}
     

    </TableBody>);
};