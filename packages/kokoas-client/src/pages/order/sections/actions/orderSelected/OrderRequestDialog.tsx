import { Dialog } from '@mui/material';
import { ORDialogTitle } from './ORDialogTitle';
import { CloseButton } from './CloseButton';
import { ORDialogContent } from './ORDialogContent';
import { ORDialogActions } from './ORDialogActions';
import { useForm } from 'react-hook-form';
import { TOrderItem, initialOrderForm } from './schema';

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
}: OrderRequestDialogProps) => {
  
  const formMethods = useForm({
    defaultValues: {
      ...initialOrderForm,
      projId,
      projName,
    },
  });


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

      <ORDialogContent />

      <ORDialogActions />

    </Dialog>
  ); 
};