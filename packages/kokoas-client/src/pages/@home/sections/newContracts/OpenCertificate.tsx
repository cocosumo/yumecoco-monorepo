import { IconButton, Tooltip } from '@mui/material';
import { CertViewer } from './certViewer/CertViewer';
import { useState } from 'react';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export const OpenCertificate = ({
  contractId,
}:{
  contractId: string
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Tooltip title={'契約報告書を開く'}>
        <IconButton onClick={handleOpen}>
          <CardGiftcardIcon />
        </IconButton>
      </Tooltip>
      <CertViewer 
        open={open}
        contractId={contractId}
        handleClose={handleClose}
      />
    </>


  );
};