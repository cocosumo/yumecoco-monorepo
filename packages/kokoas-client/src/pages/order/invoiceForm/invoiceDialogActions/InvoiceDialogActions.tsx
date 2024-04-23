import { Button, DialogActions, Fade } from '@mui/material';
import { useSaveInvoiceForm } from '../hooks/useSaveInvoiceForm';

import { useNextInvoiceStatus } from '../hooks/useNextStatus';
import { useInvoiceWatch } from '../hooks/useInvoiceRHF';
import { useConfirmDialog } from 'kokoas-client/src/hooks';

export const InvoiceDialogActions = () => {
  const { setDialogState } = useConfirmDialog();
  const invoiceId = useInvoiceWatch({
    name: 'invoiceId',
  }) as string;
  const {
    handleSubmit,
  } = useSaveInvoiceForm();

  const {
    current,
    next,
  } = useNextInvoiceStatus();

  return (
    <DialogActions
      sx={{
        justifyContent: 'center',
        height: '50px',
      }}
    >
      {current !== '支払済' && (
      <Button
        color='info'   
        variant='contained' 
        onClick={(e) => {
          setDialogState({
            open: true,
            title: `ステータスは【${next}】に更新しますか？`,
            handleYes: () => handleSubmit(e),
          });
                
              
        }}
      >
        {!!invoiceId && next}
        {invoiceId === '' && '請求確認済'}
      </Button>
      )}

    </DialogActions>
  );
};