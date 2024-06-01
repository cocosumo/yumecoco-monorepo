import { Dialog } from '@mui/material';
import { OrderDialogTitle } from './orderDialogTitle/OrderDialogTitle';
import { ORDialogContent } from './orderDialogContent/ORDialogContent';
import { OrderDialogActions } from './orderDialogActions/OrderDialogActions';
import { FormProvider, useForm } from 'react-hook-form';
import { TOrderForm, TOrderItem, initialOrderForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { atom, useAtom } from 'jotai';
import { DevTool } from '@hookform/devtools';
import { useOrderRequestInitial } from './hooks/useOrderRequestInitial';
import { useLazyEffect } from 'kokoas-client/src/hooks';
import { CloseButton } from '../common/CloseButton';

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
  const { 
    initialValues,
  } = useOrderRequestInitial();
  const [orderRequest, setOrderRequestAtom] = useAtom(orderRequestAtom);

  const {
    open,
  } = orderRequest;

  const formMethods = useForm<TOrderForm>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  const {
    reset, 
  } = formMethods;

  const handleClose = () => {
    setOrderRequestAtom({ ...orderRequest, open: false });
    reset(initialOrderForm);
  };

  useLazyEffect(() => {
    if (!open) return;
    reset(initialValues);
  }, [ open, initialValues, reset], 300);  

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'lg'}
      fullWidth
      disableEscapeKeyDown
      
    >

      <FormProvider {...formMethods}>

        <OrderDialogTitle />

    
        <ORDialogContent />

        <OrderDialogActions />

      </FormProvider>

      <CloseButton handleClose={handleClose} />

      <DevTool control={formMethods.control} placement='bottom-right' />
    </Dialog>
  ); 
};
