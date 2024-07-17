import { Button } from '@mui/material';
import { useDeleteInvoiceB2CBy$Id } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { useConfirmDialog, useNavigateWithQuery } from 'kokoas-client/src/hooks';



export const DeleteInvoice = () => {
  const [invoice$Id, projId] = useTypedWatch({
    name: ['invoice$Id', 'projId'],
  }) as [number, string];
  const {
    mutateAsync: deleteInvoice,
  } = useDeleteInvoiceB2CBy$Id();
  const { setDialogState } = useConfirmDialog();
  const navigate = useNavigateWithQuery();

  return (
    <Button
      variant={'outlined'}
      color='primary'
      disabled={!invoice$Id}
      onClick={() => {
        setDialogState({
          title: '請求書削除',
          content: '請求書を削除しますか？',
          handleYes: async () => {
            await deleteInvoice(String(invoice$Id));
            navigate('projInvoiceV2', { projId });
          },

        });

      }}
    >
      削除
    </Button>
  );

};
