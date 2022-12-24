import { Box, Button, Collapse, Stack, Typography, useTheme, Zoom } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { useConfirmDialog } from '../../../../hooks';
import { AiOutlineWarning } from '@react-icons/all-files/ai/AiOutLineWarning';


/** 編集をやめる */
export const BtnCancelEdit = () => {
  const [showText, setShowText] = useState(false);
  const { setDialogState } = useConfirmDialog();
  const { palette } = useTheme();

  const handleClose = () => {
    setDialogState({
      open: true,
      title: '確認',
      cancellable: true,
      withYes: true,
      withNo: true,
      content: (
        <Stack >
          <Zoom in={true} timeout={200}>
            <Typography textAlign={'center'} fontSize={'64px'} color={palette.warning.main}>
              <AiOutlineWarning />
            </Typography>
          </Zoom>

          <Typography textAlign={'center'} fontSize={'16px'}>
            保存せずにとじますか。
          </Typography>
        </Stack>

      ),
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
        <Box ml={1} width={'90px'}>
          編集をやめる
        </Box>
      </Collapse>


    </Button>
  );
};