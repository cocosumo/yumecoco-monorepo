import { Dialog } from '@mui/material';
import { ORDialogTitle } from './ORDialogTitle';
import { CloseButton } from './CloseButton';
import { ORDialogContent } from './orderDialogContent/ORDialogContent';
import { OrderDialogActions } from './orderDialogActions/OrderDialogActions';
import { FormProvider, useForm } from 'react-hook-form';
import { TOrderForm, TOrderItem, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { DevTool } from '@hookform/devtools';
import { useOrderRequestInitial } from './hooks/useOrderRequestInitial';

interface OrderRequestDialogProps {
  open: boolean,
  orderId?: string,
  projId: string,
  projName: string,
  storeName: string,
  selectedItems: TOrderItem[],
}

const initialDialogState : OrderRequestDialogProps = {
  open: false,
  orderId: '',
  projId: '',
  projName: '',
  storeName: '',
  selectedItems: [],
};

export const orderRequestAtom = atom(initialDialogState);

export const OrderRequestDialog = () => {
  const { initialValues } = useOrderRequestInitial();
  const [orderRequest, setOrderRequestAtom] = useAtom(orderRequestAtom);

  const {
    open,
    projName,
    storeName,
  } = orderRequest;

  const handleClose = () => {
    setOrderRequestAtom({ ...orderRequest, open: false });
  };

  const formMethods = useForm<TOrderForm>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  const { reset } = formMethods;

  useEffect(() => {
    if (open) {
      reset(initialValues);
    }
  }, [open, initialValues, reset]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'lg'}
      fullWidth
      disableEscapeKeyDown
    >
      <FormProvider {...formMethods}>
        <ORDialogTitle 
          storeName={storeName}
          projName={projName}
        />
        <CloseButton handleClose={handleClose} />
    
        <ORDialogContent />

        <OrderDialogActions />
      </FormProvider>

      <DevTool control={formMethods.control} placement='bottom-right' />
    </Dialog>
  ); 
};