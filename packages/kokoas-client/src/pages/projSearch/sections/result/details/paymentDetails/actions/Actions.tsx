import { LinearProgress, Stack, Typography } from '@mui/material';
import { UpdateLastBillingDate } from './UpdateLastBillingDate';
import { Props } from './types';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { EmptyBox } from 'kokoas-client/src/components';
import { ActionButtons } from './ActionButtons';



export const Actions = (props: Props) => {

  const {
    systemId,
    projId,
  } = props;

  const {
    data: projRec,
    isLoading: projRecIsLoading,
  } = useProjById(projId);

  if (projRecIsLoading) {
    <LinearProgress />;
  }

  if (!projRec) {
    return (<EmptyBox>
      <Typography variant='body1'>
        案件が見つかりませんでした
      </Typography>
    </EmptyBox>);
  }

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
    >
      <UpdateLastBillingDate {...props} projRec={projRec} />
      <ActionButtons projId={projId} systemId={systemId} />
    </Stack>
  );
};