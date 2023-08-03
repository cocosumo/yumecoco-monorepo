import { CarbonCopy, EnvelopeRecipients } from 'docusign-esign';
import { TSignMethod } from 'types';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent,  {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { Button, DialogActions, DialogContent, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';

type ViewType = 'sign' | 'cc';

const CustomTimeLineItem = ({
  type,
  name,
  email,
  routingOrder,
  roleName,
}: CarbonCopy & { 
  type: ViewType,
}) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: 'auto 0' }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        <Tooltip title={routingOrder}>
          <span>
            {roleName}
          </span>
        </Tooltip>
 
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />

        <TimelineDot>

          {type === 'sign'
            ? (<BorderColorIcon />)
            : (<VisibilityIcon />)}
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

export const SigningFlow = ({
  recipients,
  method,
  handleSendContract,
  handleCancel,
}:{
  recipients?: EnvelopeRecipients,
  method: TSignMethod,
  handleSendContract: () => void
  handleCancel: () => void
}) => {
  const {
    signers = [],
    carbonCopies = [],
  } = recipients || {};

  // sort and add type
  const sortedRecipients = [
    ...signers.map((props) => ({
      ...props,
      type: 'sign',
    })),
    ...carbonCopies.map((props) => ({
      ...props,
      type: 'cc',
    })),
  ].sort((a, b) => Number(a.routingOrder) - Number(b.routingOrder));

  
  return (
  
    <>
      <DialogContent>
        <Typography variant='h6'>
          {method === 'electronic' ? '電子' : '手書'}
        </Typography>
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          {sortedRecipients.map(({
            type,
            recipientId,
            ...signProps
          }) => {
            return (
              <CustomTimeLineItem
                key={recipientId}
                type={type as ViewType}
                {...signProps}
              />
            );
          })}
       
        </Timeline>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
        >
          キャンセル
        </Button>

        <Button
          color={'primary'} 
          variant={'contained'}
          onClick={handleSendContract}
        >
          送信
        </Button> 
      </DialogActions>    
    
    </>
  );
};