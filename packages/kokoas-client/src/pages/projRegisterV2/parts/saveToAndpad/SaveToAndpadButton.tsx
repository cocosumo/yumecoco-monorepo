import { AndpadButton } from 'kokoas-client/src/components/ui/buttons/AndpadButton';
import SaveIcon from '@mui/icons-material/Save';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { SaveToAndpadDialog } from './SaveToAndpadDialog';

export const SaveToAndpadButton = (
  {
    isExist,
    disabled = false,
  }:{
    isExist : boolean
    disabled?: boolean,
  },
) => {

  
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const mode = isExist ? '更新' : '登録';

  return (
    <>
      <Tooltip title={`Anpadへ案件${mode}します`}>
        <span>
          <AndpadButton
            onClick={handleClick}
            startIcon={<SaveIcon />}
            size='small'
            disabled={disabled}
          >
            {`Andpadへ${mode}`}
          </AndpadButton>
        </span>
      </Tooltip>
      <SaveToAndpadDialog open={open} mode={mode} handleClose={handleClose} />
    </>

  );
};