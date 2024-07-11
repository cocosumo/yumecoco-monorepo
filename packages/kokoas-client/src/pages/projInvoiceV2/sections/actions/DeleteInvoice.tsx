import { Button } from '@mui/material';
import { useDeleteInvoiceById } from 'kokoas-client/src/hooksQuery';



export const DeleteInvoice = () => {
  const deleteInvoice = useDeleteInvoiceById();

  return (
    <Button
      variant={'outlined'}
      color='primary'
      onClick={deleteInvoice}
    >
      削除
    </Button>
  );

};
