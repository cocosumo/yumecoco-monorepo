
import { Stack, TableCell, Typography } from '@mui/material';
import { Fragment } from 'react';
import styles from './MonthRowEvents.module.css';

export const MonthRowEvents = ({
  eventsByMonth,
}:{
  eventsByMonth: string[] | undefined;
}) => {

  return (
    <TableCell 
      rowSpan={3}
      className={styles.eventsCell}
    >
      <Stack
        direction="column"
        height={100}
      >
        {eventsByMonth?.map((eventDetails) => {
          return (
            <Fragment key={eventDetails}>
              <Typography 
                fontSize={12}
                className={styles.events}
              >
                {eventDetails}
              </Typography>
            </Fragment>
          );
        })}

      </Stack>
    </TableCell>
  );
};