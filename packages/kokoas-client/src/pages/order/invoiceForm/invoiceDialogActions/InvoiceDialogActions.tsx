import { Button, CircularProgress, DialogActions, Fade } from '@mui/material';
import { useSaveInvoiceForm } from '../hooks/useSaveInvoiceForm';

import { useNextInvoiceStatus } from '../hooks/useNextStatus';
import { useInvoiceWatch } from '../hooks/useInvoiceRHF';
import { useIsFormIdle } from 'kokoas-client/src/hooks/useIsFormIdle';

export const InvoiceDialogActions = () => {
  const isFormIdle = useIsFormIdle();
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
      <Fade in={isFormIdle && current !== '支払済'}>
        <Button
          color='info'   
          variant='contained' 
          onClick={(e) => {
            handleSubmit(e);     
          }}
        >
          {!!invoiceId && next}
          {invoiceId === '' && '請求確認済'}
        </Button>
      </Fade>
      
      {!isFormIdle && (
        <CircularProgress size={16} />
      )}
    </DialogActions>
  );
};