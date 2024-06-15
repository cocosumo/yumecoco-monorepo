import { Button, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import { CopyConfirm } from './CopyConfirm';





export const CopyForm = () => {


  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title={'当レコードをコピーし、新なレコードを作成します'}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => setOpen(true)}
        >
          <ContentCopyIcon />
        </Button>

      </Tooltip>
      <CopyConfirm 
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>

  );
};