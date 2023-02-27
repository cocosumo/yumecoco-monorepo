import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from 'kokoas-client/src/pages/Router';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvoicesDialogContent } from './InvoicesDialogContent';


export interface ConfirmationDialogInvoiceProps {
  name: string;
  open: boolean;
  onClose: () => void;
  custGroupId: string
}

export const ConfirmationDialogInvoice = (props: ConfirmationDialogInvoiceProps) => {
  const { name, onClose, open, custGroupId } = props;
  const [value, setValue] = useState('');
  const navigate = useNavigate();


  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    navigate(`${pages.projInvoice}?${generateParams({ invoiceId: value })}`);
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };


  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      onClose={() => onClose()}
    >
      <DialogTitle>
        {'請求書を選択してください'}
      </DialogTitle>
      <InvoicesDialogContent
        name={name}
        onChange={handleChange}
        custGroupId={custGroupId}
        value={value}
      />
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          キャンセル
        </Button>
        <Button onClick={handleOk}>
          選択
        </Button>
      </DialogActions>
    </Dialog>
  );
};