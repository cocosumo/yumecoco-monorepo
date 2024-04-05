import { Dialog } from '@mui/material';
import { ORDialogTitle } from './ORDialogTitle';
import { CloseButton } from './CloseButton';
import { ORDialogContent } from './ORDialogContent';
import { ORDialogActions } from './ORDialogActions';

interface OrderRequestDialogProps {
  open: boolean,
  handleClose: () => void,
  storeName: string,
  projName: string,
}

export const OrderRequestDialog = ({
  open,
  handleClose,
  storeName,
  projName,
}: OrderRequestDialogProps) => {
  


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