import { TableCell, TableRow } from '@mui/material';
import { Fragment } from 'react';
import { MonthHeader } from './MonthHeader';
import { useFiscalYearData } from '../../../hooks/useFiscalYearData';

export const MonthRow = ({
  month,
}:{
  month: number;
}) => {
  const { data } = useFiscalYearData();

  const {
    meetingEventTable,
  } = data || {};

  const events = (meetingEventTable?.value || [])
    .filter((row) => parseInt(row.value.eventMonth.value) === month);

  return (
    <Fragment key={month}>
      <TableRow>
        <MonthHeader month={month} />

        <TableCell rowSpan={3}>
          {events.map(({ 
            id,
            value:{ eventDetails }, 
          }) => {
            return (
              <div key={id}>
                {eventDetails.value}
              </div>);
          })}
        </TableCell>

        <TableCell>
          目標値
        </TableCell>

        {/* 新築工事 */}
        <TableCell>
          111
        </TableCell>

        {/* 新築付帯工事 */}
        <TableCell>
          222
        </TableCell>

        {/* 太陽光 */}
        <TableCell>
          333
        </TableCell>

        {/* リフォーム工事 */}
        <TableCell>
          444
        </TableCell>

        {/* その他 */}
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
};