import { Button, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import { CopyConfirm } from './CopyConfirm';





export const CopyForm = () => {


  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title={'当見積をコピーし、新な見積を作成します'}>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          startIcon={<ContentCopyIcon />}
        >
          コピー
        </Button>

      </Tooltip>
      <CopyConfirm 
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>

  );
};