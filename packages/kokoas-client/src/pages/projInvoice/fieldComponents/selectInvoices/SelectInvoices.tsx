import { Button } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useState } from 'react';
import { ConfirmationDialogInvoice } from './ConfirmationDialogInvoice';

export const SelectInvoices = ({
  custGroupId,
}:{
  custGroupId: string
}) => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} color='secondary'>
        <ManageSearchIcon />
        請求書の選択
      </Button>

      <ConfirmationDialogInvoice
        open={open}
        onClose={handleClose}
        custGroupId={custGroupId}
      />
    </>
  );
};