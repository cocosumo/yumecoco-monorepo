import { Stack } from '@mui/material';
import { ActionButton } from '../../common/ActionButton';
import { UpdateLastBillingDate } from './UpdateLastBillingDate';
import { Props } from './types';



export const Actions = (props: Props) => {

  const {
    systemId,
  } = props;

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
    >
      <UpdateLastBillingDate {...props} />
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