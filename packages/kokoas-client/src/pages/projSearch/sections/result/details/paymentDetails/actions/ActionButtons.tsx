import { Stack } from '@mui/system';
import { ActionButton } from '../../common/ActionButton';
import { UnisssuedInvoiceAlert } from '../unissuedInvoiceAlert/UnisssuedInvoiceAlert';


export const ActionButtons = ({
  projId,
  systemId,
}:{
  projId: string,
  systemId: number,
}) => {

  return (
    <Stack
      direction={'row'}
      spacing={2}
      justifyContent={'flex-end'}
    >
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
