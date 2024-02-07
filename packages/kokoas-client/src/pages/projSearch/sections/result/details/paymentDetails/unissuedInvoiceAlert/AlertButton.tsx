import { Button, Tooltip } from '@mui/material';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { useState } from 'react';
import { AlertDialog } from './AlertDialog';


export const AlertButton = ({
  projId,
}:{
  projId: string
}) => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        title='担当者のchatworkへアラートを通知する'
        placement='top'
      >
        <Button
          startIcon={<AddAlertIcon />}
          variant='outlined'
          size='small'
          onClick={handleOpen}
        >
          アラート発行
        </Button>
      </Tooltip>
    
      <AlertDialog 
        open={open} 
        handleClose={handleClose}
        projId={projId}
      />
    </>
  );
};
