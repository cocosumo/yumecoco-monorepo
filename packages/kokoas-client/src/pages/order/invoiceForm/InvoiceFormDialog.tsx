import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { atom, useAtom } from 'jotai';
import { FormProvider, useForm } from 'react-hook-form';
import { initialInvoiceForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

interface InvoiceDialogProps {
  open: boolean,
  orderId?: string,
  projId: string,
  projName: string,
  storeName: string,
  //selectedItems: TOrderItem[],
}

const initialDialogState : InvoiceDialogProps = {
  open: false,
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

  const handleClose = () => {
    setInvoiceDialogAtom({ ...invoiceDialog, open: false });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'lg'}
      fullWidth
    >
      <FormProvider {...formMethods}>

        <DialogTitle>
          TODO: Form
        </DialogTitle>
        <DialogContent>
          HELLO

        </DialogContent>

      
      </FormProvider>
    
      <DevTool control={formMethods.control} placement='bottom-right' />

    </Dialog>
  );

};