import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { InvoicesDialogContent } from './InvoicesDialogContent';


export interface ConfirmationDialogInvoiceProps {
  open: boolean;
  onClose: () => void;
  custGroupId: string
}

export const ConfirmationDialogInvoice = (props: ConfirmationDialogInvoiceProps) => {
  const { onClose, open, custGroupId } = props;

  const handleCancel = () => {
    onClose();
  };


  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={() => onClose()}
    >
      <DialogTitle>
        {'請求書を選択してください'}
      </DialogTitle>
      <InvoicesDialogContent
        onClose={handleCancel}
        custGroupId={custGroupId}
      />
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};