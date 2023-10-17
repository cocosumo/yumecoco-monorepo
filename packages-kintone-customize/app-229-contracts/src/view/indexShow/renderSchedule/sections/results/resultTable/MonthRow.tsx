import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import { Fragment } from 'react';
import { MonthHeader } from './MonthHeader';
import { projTypesToShow } from '../../../config';

import { roundTo } from 'libs';
import { useTargetData } from '../../../hooks/useTargetData';

export const MonthRow = ({
  month,
}:{
  month: number;
}) => {

  const { data } = useTargetData();
  const {
    events,
    totalMonthlyTarget,
    othersMonthlyTarget,
    targets,

  } = data || {};



  return (
    <Fragment key={month}>
      <TableRow>
        <MonthHeader month={month} />

        <TableCell rowSpan={3}>
          <Stack
            direction="column"
            height={100}
          >
            {events?.[month]?.map((eventDetails) => {
              return (
                <Fragment key={eventDetails}>
                  <Typography fontSize={12} >
                    {eventDetails}
                  </Typography>
                </Fragment>
              );
            })}

          </Stack>
        </TableCell>

        <TableCell>
          目標値
        </TableCell>

        {projTypesToShow.map(({
          id,
        }) => {
          return (
            <TableCell key={id}>
              {roundTo(targets?.[id]?.monthlyTarget ?? 0).toLocaleString()}
            </TableCell>
          );
        })}

        {/* その他 */}
        <TableCell>
          {roundTo(othersMonthlyTarget ?? 0).toLocaleString()}
        </TableCell>

        {/* 目標合計 */}
        <TableCell>
          {roundTo(totalMonthlyTarget ?? 0).toLocaleString()}
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
};