
import { Stack, TableCell } from '@mui/material';
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
      >
        {eventsByMonth?.map((eventDetails) => {
          return (
            <Fragment key={eventDetails}>
              {eventDetails}
            </Fragment>
          );
        })}

      </Stack>
    </TableCell>
  );
};