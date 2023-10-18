import { Stack, TableCell, Typography } from '@mui/material';
import { Fragment } from 'react';

export const MonthRowEvents = ({
  eventsByMonth,
}:{
  eventsByMonth: string[] | undefined;
}) => {

  return (
    <TableCell rowSpan={3}>
      <Stack
        direction="column"
        height={100}
      >
        {eventsByMonth?.map((eventDetails) => {
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
  );
};