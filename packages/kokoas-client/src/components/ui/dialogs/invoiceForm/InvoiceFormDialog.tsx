import { Dialog } from '@mui/material';
import { atom, useAtom } from 'jotai';
import { FormProvider, useForm } from 'react-hook-form';
import { initialInvoiceForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { InvoiceDialogContent } from './invoiceDialogContent/InvoiceDialogContent';
import { InvoiceDialogTitle } from './invoiceDialogTitle/InvoiceDialogTitle';
import { useResolveParams } from './hooks/useResolveParams';
import { useLazyEffect } from 'kokoas-client/src/hooks';
import { InvoiceDialogActions } from './invoiceDialogActions/InvoiceDialogActions';
import { CloseButton } from '../CloseButton';

export interface InvoiceDialogProps {
  open: boolean,
  orderId?: string,
  projId: string,
  projName: string,
  storeName: string,
  invoiceId?: string | null,
}

export const initialDialogState : InvoiceDialogProps = {
  open: false,
  orderId: '',
  projId: '',
  projName: '',
  storeName: '',
  invoiceId: '',
};

export const invoiceDialogAtom = atom(initialDialogState);

export const InvoiceFormDialog = () => {
  const {
    initialValues,
    isFetching,
  } = useResolveParams();

  const [invoiceDialog, setInvoiceDialogAtom] = useAtom(invoiceDialogAtom);
  const {
    open,
  } = invoiceDialog;

  const formMethods = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  const { 
    reset,
  } = formMethods;

  useLazyEffect(() => {
    if (open && !isFetching) {
      reset(initialValues);
    }
  }, [open, initialValues, isFetching], 300);

  const handleClose = () => {
    setInvoiceDialogAtom((prev) => ({ ...prev, open: false }) );
    reset(initialInvoiceForm);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'lg'}
      fullWidth
    >
      <FormProvider {...formMethods}>

        <InvoiceDialogTitle />
        
        <InvoiceDialogContent />

        <InvoiceDialogActions />

      </FormProvider>
    
      <CloseButton handleClose={handleClose} />

      <DevTool control={formMethods.control} placement='bottom-right' />

    </Dialog>
  );

};