import SendIcon from '@mui/icons-material/Send';
import {  Button } from '@mui/material';
import { useState } from 'react';
import { StartDialog } from './StartDialog';

export const StartContract = ()=>{
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        startIcon={<SendIcon />}
      >
        契約を印刷する
      </Button>
      <StartDialog 
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};