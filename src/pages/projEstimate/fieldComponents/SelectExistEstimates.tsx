import { Button } from '@mui/material';
import { useState } from 'react';
import { ConfirmationDialogRaw } from './dialogActions/ConfirmationDialogRaw';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


export const SelectExistEstimates = ({
  projId,
}: {
  projId: string,
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
        見積もりの選択
      </Button>

      <ConfirmationDialogRaw
        name='estimateId'
        open={open}
        onClose={handleClose}
        projId={projId}
      />
    </>
  );
};