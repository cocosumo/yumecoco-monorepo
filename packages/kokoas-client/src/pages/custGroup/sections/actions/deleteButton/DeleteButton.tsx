import { Button, Tooltip } from '@mui/material';
import { useState } from 'react';
import { ConfirmationDialog } from './ConfirmationDialog';

export const DeleteButton = ({
  disabled,
}:{
  disabled: boolean,
}) => {

  const [open, setOpen] = useState(false);
  

  return (
    <>
    
      <Tooltip
        title={'顧客を削除します。'}
      >
        <Button
          variant='contained'
          color='error'
          disabled={disabled}
          onClick={() => {setOpen(true);}}
        >
          削除
        </Button>

      </Tooltip>
      <ConfirmationDialog 
        open={open}
        handleClose={() => {setOpen(false);}}
      />
    </>
  );
};