import { Dialog } from '@mui/material';
import { ORDialogTitle } from './ORDialogTitle';
import { CloseButton } from './CloseButton';

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
    </Dialog>
  ); 
};