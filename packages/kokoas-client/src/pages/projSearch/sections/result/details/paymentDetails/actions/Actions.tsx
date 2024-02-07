import { LinearProgress, Stack, Typography } from '@mui/material';
import { ActionButton } from '../../common/ActionButton';
import { UpdateLastBillingDate } from './UpdateLastBillingDate';
import { Props } from './types';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { EmptyBox } from 'kokoas-client/src/components';
import { UnisssuedInvoiceAlert } from '../unissuedInvoiceAlert/UnisssuedInvoiceAlert';



export const Actions = (props: Props) => {

  const {
    systemId,
    projId,
  } = props;

  const { 
    data: projRec, 
    isLoading: projRecIsLoading,
  } = useProjById(projId);

  if (projRecIsLoading ) {
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
      <UnisssuedInvoiceAlert projId={projId} />
      <ActionButton
        href={`https://andpad.jp/manager/my/orders/${systemId}/customer_agreement`}
        title='入金情報をAndpadで見る'
        target='_blank'
      >
        入金情報
      </ActionButton>

    </Stack>
  );
};