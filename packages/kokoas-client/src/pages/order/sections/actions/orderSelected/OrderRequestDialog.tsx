import { Dialog } from '@mui/material';
import { ORDialogTitle } from './ORDialogTitle';
import { CloseButton } from './CloseButton';
import { ORDialogContent } from './ORDialogContent';
import { ORDialogActions } from './ORDialogActions';
import { useForm } from 'react-hook-form';
import { TOrderItem, initialOrderForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

interface OrderRequestDialogProps {
  open: boolean,
  handleClose: () => void,
  projId: string,
  projName: string,
  storeName: string,
  selectedItems: TOrderItem[],
}

export const OrderRequestDialog = ({
  open,
  handleClose,
  projId,
  projName,
  storeName,
  selectedItems,
}: OrderRequestDialogProps) => {
  
  const formMethods = useForm({
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