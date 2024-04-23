import { Dialog } from '@mui/material';
import { atom, useAtom } from 'jotai';
import { FormProvider, useForm } from 'react-hook-form';
import { initialInvoiceForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { InvoiceDialogContent } from './invoiceDialogContent/InvoiceDialogContent';
import { InvoiceDialogTitle } from './invoiceDialogTitle/InvoiceDialogTitle';
import { CloseButton } from '../common/CloseButton';
import { InvoiceDialogActions } from './invoiceDialogActions/InvoiceDialogActions';
import { useResolveParams } from './hooks/useResolveParams';
import { useLazyEffect } from 'kokoas-client/src/hooks';

export interface InvoiceDialogProps {
  open: boolean,
  orderId?: string,
  projId: string,
  projName: string,
  storeName: string,
  invoiceId?: string,
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
  } = useResolveParams();

  const [invoiceDialog, setInvoiceDialogAtom] = useAtom(invoiceDialogAtom);
  const {
    open,
  } = invoiceDialog;

  const formMethods = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  const { reset } = formMethods;

  useLazyEffect(() => {
    if (open) {
      reset(initialValues);
    }
  }, [open, initialValues], 100);

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