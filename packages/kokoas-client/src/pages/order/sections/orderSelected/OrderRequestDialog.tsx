import { Dialog } from '@mui/material';
import { ORDialogTitle } from './ORDialogTitle';
import { CloseButton } from './CloseButton';
import { ORDialogContent } from './orderDialogContent/ORDialogContent';
import { ORDialogActions } from './ORDialogActions';
import { useForm } from 'react-hook-form';
import { TOrderForm, TOrderItem, initialOrderForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { atom, useAtom } from 'jotai';

interface OrderRequestDialogProps {
  open: boolean,
  projId: string,
  projName: string,
  storeName: string,
  selectedItems: TOrderItem[],
}

const initialDialogState : OrderRequestDialogProps = {
  open: false,
  projId: '',
  projName: '',
  storeName: '',
  selectedItems: [],
};

export const orderRequestAtom = atom(initialDialogState);

export const OrderRequestDialog = () => {

  const [orderRequest, setOrderRequestAtom] = useAtom(orderRequestAtom);

  const {
    open,
    projId,
    projName,
    storeName,
    selectedItems,
  } = orderRequest;

  const handleClose = () => {
    setOrderRequestAtom({ ...orderRequest, open: false });
  };
  
  const formMethods = useForm<TOrderForm>({
    defaultValues: {
      ...initialOrderForm,
      projId,
      projName,
      selectedItems,
    },
    resolver: zodResolver(schema),
    
  });

  const { control } = formMethods;


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'lg'}
      fullWidth
    >
      <ORDialogTitle 
        storeName={storeName}
        projName={projName}
      />
      <CloseButton handleClose={handleClose} />

      <ORDialogContent control={control} />

      <ORDialogActions />

    </Dialog>
  ); 
};