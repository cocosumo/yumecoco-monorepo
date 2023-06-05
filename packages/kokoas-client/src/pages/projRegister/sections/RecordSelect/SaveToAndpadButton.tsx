import { AndpadButton } from 'kokoas-client/src/components/ui/buttons/AndpadButton';
import SaveIcon from '@mui/icons-material/Save';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { SaveToAndpadDialog } from './SaveToAndpadDialog';

export const SaveToAndpadButton = (
  {
    isExist,
  }:{
    isExist : boolean
  },
) => {

  
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const mode = isExist ? '更新' : '登録';

  return (
    <div>
      <Tooltip title={`Anpadへ案件${mode}します`}>
        <AndpadButton
          onClick={handleClick}
          fullWidth sx={{ height: '100%' }}
          startIcon={<SaveIcon />}
        >
          {`Andpadへ${mode}`}
        </AndpadButton>

      </Tooltip>
      <SaveToAndpadDialog open={open} mode={mode} handleClose={handleClose} />
    </div>

  );
};