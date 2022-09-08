import { Button, Collapse } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { Box } from '@mui/system';


/** 編集をやめる */
export const BtnCancelEdit = () => {
  const [showText, setShowText] = useState(false);

  return (
    <Button
      variant='outlined'
      size="medium"
      aria-label="cancel"
      color={'warning'}
      sx={{ opacity: showText ? 1 : 0.5 }}
      onMouseEnter={()=>setShowText(true)}
      onMouseLeave={()=>setShowText(false)}
    >
      <CancelIcon />
      <Collapse in={showText} orientation={'horizontal'}
        mountOnEnter unmountOnExit
      >
        <Box ml={1} width={'80px'}>
          編集をやめる
        </Box>
      </Collapse>


    </Button>
  );
};