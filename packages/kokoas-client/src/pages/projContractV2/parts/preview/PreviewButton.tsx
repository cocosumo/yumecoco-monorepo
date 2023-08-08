import { Button } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import { useState } from 'react';
import { ContractDialog } from './ContractDialog';


export const PreviewButton = ({
  disabled,
}:{
  disabled: boolean
}) => {

  const [open, setOpen] = useState(false);

  return (
    <>   
      <Button
        variant="outlined"
        size="small"
        startIcon={<PreviewIcon />}
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        プレビュー
      </Button>
      <ContractDialog 
        handleClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};