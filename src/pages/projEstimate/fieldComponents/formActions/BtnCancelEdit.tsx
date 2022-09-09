import { Button, Collapse, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { Box } from '@mui/system';
import { useConfirmDialog } from '../../../../hooks';
import PanToolIcon from '@mui/icons-material/PanTool';


/** 編集をやめる */
export const BtnCancelEdit = () => {
  const [showText, setShowText] = useState(false);
  const { setDialogState } = useConfirmDialog();

  const handleClose = () => {
    setDialogState({
      open: true,
      title: '保存せずに閉じますか。',
      cancellable: true,
      withYes: true,
      withNo: true,
      content: (
        <Typography fontSize={'32px'}>
          <PanToolIcon color='warning' />
        </Typography>),
      handleYes: () => self?.window?.close(),
    });
  };

  return (
    <Button
      variant='outlined'
      size="medium"
      aria-label="cancel"
      color={'warning'}
      sx={{ opacity: showText ? 1 : 0.5 }}
      onMouseEnter={()=>setShowText(true)}
      onMouseLeave={()=>setShowText(false)}
      onClick={handleClose}
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