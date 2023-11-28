import { EnvelopeRecipients } from 'docusign-esign';
import { TSignMethod } from 'types';
import Timeline from '@mui/lab/Timeline';
import  {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import Typography from '@mui/material/Typography';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { CustomTimeLineItem, ViewType } from './CustomLineItem';
import { addVirtualProcess } from './helper/addVirtualProcess';



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
  let sortedRecipients = [
    ...signers.map((props) => ({
      ...props,
      type: 'sign' as ViewType,
    })),
    ...carbonCopies.map((props) => ({
      ...props,
      type: 'cc' as ViewType,
    })),
  ].sort((a, b) => Number(a.routingOrder) - Number(b.routingOrder));

  const isElectronic = method === 'electronic';

  if (!isElectronic) {
    sortedRecipients = addVirtualProcess(sortedRecipients);
  }

  sortedRecipients.push({
    type: 'complete',
    roleName: '',
    name: '',
    recipientId: 'complete',
  });
  
  return (
  
    <>
      <DialogContent>
        <Typography variant='h6'>
          {isElectronic ? '電子' : '手書'}
        </Typography>
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          {sortedRecipients.map((signProps) => {

            return (
              <CustomTimeLineItem
                key={signProps.recipientId}
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
          onClick={() => {
            handleSendContract();
          }}
        >
          送信
        </Button> 
      </DialogActions>    
    
    </>
  );
};