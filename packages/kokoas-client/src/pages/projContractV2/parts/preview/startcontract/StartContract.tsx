import SendIcon from '@mui/icons-material/Send';
import {  Button } from '@mui/material';
import { useState } from 'react';
import { StartDialog } from './StartDialog';
import { EnvelopeRecipients } from 'docusign-esign';

export const StartContract = ({
  recipients,
  isFetching,
}:{
  recipients?: EnvelopeRecipients,
  isFetching?: boolean,
})=>{
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        startIcon={<SendIcon />}
        disabled={isFetching}
      >
        契約を印刷する
      </Button>
      <StartDialog 
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        recipients={recipients}
      />
    </>
  );
};