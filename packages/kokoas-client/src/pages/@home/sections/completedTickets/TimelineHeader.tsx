import { 
  TimelineContent, 
  TimelineDot, 
  TimelineItem, 
  TimelineOppositeContent, 
  TimelineSeparator, 
} from '@mui/lab';
import { Box } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';


export const TimelineHeader = () => {
  return (
    <TimelineItem 
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        minHeight: '50px',
      }}
      
    >
      <TimelineOppositeContent 
        color="text.secondary" 
        fontWeight={'bold'}
        sx={{
          pt: '18px',
        }}
      >
        <Box 
          bgcolor={'white'}
        >
          実装日
        </Box>
         
      </TimelineOppositeContent>
      <TimelineSeparator >
        <TimelineDot >
          <TipsAndUpdatesIcon fontSize='small' />
        </TimelineDot>
      </TimelineSeparator>
      <TimelineContent 
        color="text.secondary" 
        fontWeight={'bold'}
        sx={{
          pt: '18px',
        }}
      >
        <Box 
          bgcolor={'white'}
        >
          実装内容
        </Box>
          
      </TimelineContent>
    </TimelineItem>
  );
};