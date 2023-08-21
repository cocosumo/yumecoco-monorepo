import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { useCompletedTickets } from 'kokoas-client/src/hooksQuery';
import {  LinearProgress, Link } from '@mui/material';
import parseISO from 'date-fns/fp/parseISO';
import { AppIds } from 'config';
import { TUpdateType, TimelineIcon } from './TimelineIcon';
import differenceInDays from 'date-fns/differenceInDays';
import { DynamicTime } from './DynamicTime';
import { Suggestions } from './Suggestions';

const ptOffset = '44px';

export const CompletedTickets = () => {
  const { data, isLoading } = useCompletedTickets();

  const currentTime = new Date();

  return (
    <>
      <Timeline 
        position="right"
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
          backgroundColor: 'white',
          borderRadius: 4,
          height: 250,
          overflowY: 'scroll',
        }}
      >
        {isLoading && <LinearProgress />}

        <TimelineConnector />
        {!isLoading && data?.map(({
          $id,
          announcementTitle,
          completedTime,
          updateType,
        }) => {
          const parsedCompletedTime = completedTime.value ?  parseISO(completedTime.value) : currentTime;
          const isNew = differenceInDays(currentTime, parsedCompletedTime) < 2;

          return (
            <TimelineItem 
              key={$id.value}
              sx={{
                minHeight: '80px',
              }}
            >
              <TimelineOppositeContent 
                color="text.secondary"
                sx={{
                  pt: ptOffset,
                }}
              >
                <DynamicTime time={parsedCompletedTime} />
              </TimelineOppositeContent>
    
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineIcon 
                  updateType={updateType.value as TUpdateType} 
                  isNew={isNew}
                  recId={$id.value}
                />
              </TimelineSeparator>
              <TimelineContent 
                sx={{
                  pt: ptOffset,
                }}
              >
                <Link 
                  underline="hover"
                  href={`https://${window.location.hostname}/k/${AppIds.ticketSystem}/show#record=${$id.value}`} 
                  target='_blank'
                  rel="noopener"
                >
                  {announcementTitle.value}
                </Link>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
      <Suggestions />
    </>

  );
};
