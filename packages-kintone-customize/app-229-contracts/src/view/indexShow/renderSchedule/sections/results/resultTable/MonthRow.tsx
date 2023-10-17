import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import { Fragment } from 'react';
import { MonthHeader } from './MonthHeader';
import { projTypesToShow } from '../../../config';

import { roundTo } from 'libs';
import { UseTargetDataReturn } from '../../../hooks/useTargetData';
import { MonthRowActual } from './MonthRowActual';

export const MonthRow = ({
  month,
  data,
}:{
  month: number;
  data: UseTargetDataReturn['data']
}) => {

  const {
    events,
    totalMonthlyTarget,
    othersMonthlyTarget,
    targets,
    groupedContracts,
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
            <TableCell 
              key={id} align='right'
              sx={{
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {roundTo(targets?.[id]?.monthlyTarget ?? 0).toLocaleString()}
            </TableCell>
          );
        })}

        {/* その他 */}
        <TableCell 
          align='right'
          sx={{
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          {roundTo(othersMonthlyTarget ?? 0).toLocaleString()}
        </TableCell>

        {/* 目標合計 */}
        <TableCell 
          align='right'
          sx={{
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          {roundTo(totalMonthlyTarget ?? 0).toLocaleString()}
        </TableCell>

        <TableCell rowSpan={3} />
        <TableCell rowSpan={3} />

        <TableCell>
          -
        </TableCell>
 
        <TableCell rowSpan={3} />


      </TableRow>

      <TableRow >
        <TableCell>
          昨年実績値
        </TableCell>
        {projTypesToShow.map(({
          id,
        }) => {
          return (
            <TableCell 
              sx={{
                fontSize: 18,
                fontWeight: 'bold',
              }}
              key={id} align='right'
            >
              0
            </TableCell>
          );
        })}

        <TableCell 
          align='right'
          sx={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          0
        </TableCell>

        <TableCell>
          -
        </TableCell>
 
              
      </TableRow>

      <MonthRowActual groupedContractsByProjId={groupedContracts?.[month]} />



    </Fragment>
  );
};