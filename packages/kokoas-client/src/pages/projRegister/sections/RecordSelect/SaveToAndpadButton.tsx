import { AndpadButton } from 'kokoas-client/src/components/ui/buttons/AndpadButton';
import SaveIcon from '@mui/icons-material/Save';
import { Tooltip, Zoom } from '@mui/material';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { useState } from 'react';
import { SaveToAndpadDialog } from './SaveToAndpadDialog';

export const SaveToAndpadButton = (
  {
    show,
  }:{
    show : boolean
  },
) => {
  const [open, setOpen] = useState(false);
  const { setSnackState } = useSnackBar();
  const handleClick = () => {
    setSnackState({ open:true, message: '開発中です', severity: 'warning' });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Zoom in={show}>
      <div>
        <Tooltip title={'Anpadへ案件を登録します'}>
          <AndpadButton
            onClick={handleClick}
            fullWidth sx={{ height: '100%' }}
            startIcon={<SaveIcon />}
          >
            アンドパッドへ登録
          </AndpadButton>

        </Tooltip>
        <SaveToAndpadDialog open={open} handleClose={handleClose} />
      </div>
    </Zoom>
  );
};