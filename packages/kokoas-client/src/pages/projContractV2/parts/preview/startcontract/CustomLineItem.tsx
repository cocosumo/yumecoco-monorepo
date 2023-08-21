import { 
  TimelineConnector, 
  TimelineContent, 
  TimelineDot, TimelineItem, 
  TimelineOppositeContent, 
  TimelineSeparator, 
  timelineOppositeContentClasses, 
} from '@mui/lab';
import { Box, Tooltip, Typography } from '@mui/material';
import { CarbonCopy } from 'docusign-esign';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export type ViewType = 'sign' | 'cc' | 'print' | 'upload';

export type CustomTimeLineItemProps = CarbonCopy & { 
  type: ViewType,
};

const resolveIcon = (type: ViewType) => {
  switch (type) {
    case 'sign':
      return (<BorderColorIcon />);
    case 'cc':
      return (<VisibilityIcon />);
    case 'print':
      return (<LocalPrintshopIcon />);
    case 'upload':
      return (<CloudUploadIcon />);
    default:
      return (<VisibilityIcon />);
  }
};

export const CustomTimeLineItem = ({
  type,
  name,
  email,
  routingOrder,
  roleName,
}: CustomTimeLineItemProps) => {
  return (
    <TimelineItem sx={{
      [`& .${timelineOppositeContentClasses.root}`]: {
        flex: 0.3,
      },
    }}
    >
      <TimelineOppositeContent
        sx={{ m: 'auto 0' }}
        align="right"
        variant="body2"
        color="text.secondary"
        
      >
        <Tooltip title={routingOrder}>
          <Box whiteSpace={'nowrap'}>
            {roleName}
          </Box>
        </Tooltip>
 
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />

        <TimelineDot>
          {resolveIcon(type)}
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '12px', px: 2 }}>
        <Typography variant="h6" component="span">
          {name}
        </Typography>
        <Typography>
          {email}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};