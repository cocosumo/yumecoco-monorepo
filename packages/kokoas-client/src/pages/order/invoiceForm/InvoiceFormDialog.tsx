import { Dialog } from '@mui/material';
import { atom, useAtom } from 'jotai';
import { FormProvider, useForm } from 'react-hook-form';
import { initialInvoiceForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { InvoiceDialogContent } from './invoiceDialogContent/InvoiceDialogContent';
import { InvoiceDialogTitle } from './invoiceDialogTitle/InvoiceDialogTitle';
import { CloseButton } from '../common/CloseButton';

interface InvoiceDialogProps {
  open: boolean,
  orderId?: string,
  projId: string,
  projName: string,
  storeName: string,
  //selectedItems: TOrderItem[],
}

const initialDialogState : InvoiceDialogProps = {
  open: true,
  orderId: '',
  projId: '',
  projName: '',
  storeName: '',
  //selectedItems: [],
};

export const invoiceDialogAtom = atom(initialDialogState);

export const InvoiceFormDialog = () => {

  const [invoiceDialog, setInvoiceDialogAtom] = useAtom(invoiceDialogAtom);
  const {
    open,
  } = invoiceDialog;

  const formMethods = useForm({
    defaultValues: initialInvoiceForm,
    resolver: zodResolver(schema),
  });

  const { reset } = formMethods;

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

      </FormProvider>
    
      <CloseButton handleClose={handleClose} />

      <DevTool control={formMethods.control} placement='bottom-right' />

    </Dialog>
  );

};