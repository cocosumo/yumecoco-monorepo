
import { IconButton, Tooltip } from '@mui/material';
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog';
import { useCallback, useState } from 'react';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

export const DeleteButton = ({
  show,
  fileName,
  fileKey,
}:{
  show: boolean,
  fileName: string,
  fileKey: string,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(()=>{
    setOpen(false);
  }, []);
 

  return (
    <>
      <Tooltip title={'削除'} placement='right'>
        <IconButton 
          size='small'
          sx={{
            visibility: show ? 'visible' : 'hidden',
          }}
          onClick={() => setOpen(true)}
        >
          <HighlightOffRoundedIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    
      <ConfirmDeleteDialog 
        onClose={handleClose} 
        open={open}
        fileName={fileName}
        fileKey={fileKey}
      />
    </>
    
  );
};