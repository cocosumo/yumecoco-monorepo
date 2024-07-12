import { Button } from '@mui/material';
import { useDeleteInvoiceB2CBy$Id } from 'kokoas-client/src/hooksQuery';



export const DeleteInvoice = () => {
  const {
    mutateAsync: deleteInvoice,
  } = useDeleteInvoiceB2CBy$Id();

  return (
    <Button
      variant={'outlined'}
      color='primary'
      onClick={() => {
        deleteInvoice('id');
      }}
    >
      削除
    </Button>
  );

};
