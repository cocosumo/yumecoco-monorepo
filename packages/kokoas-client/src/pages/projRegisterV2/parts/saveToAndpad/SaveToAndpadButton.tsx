import { AndpadButton } from 'kokoas-client/src/components/ui/buttons/AndpadButton';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { SaveToAndpadDialog } from './SaveToAndpadDialog';
import { AndpadButtonContainer } from '../AndpadButtonContainer';

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

      <AndpadButtonContainer
        emphasis='登録ない場合'
        disabled={disabled}
        disabledMessage='既に強制接続のため、登録が出来ません'
        onClick={handleClick}
      >
        <AndpadButton
          onClick={handleClick}
          startIcon={<SaveIcon />}
          size='small'
          disabled={disabled}
        >
          {`Andpadへ${mode}`}
        </AndpadButton>
      </AndpadButtonContainer>
      <SaveToAndpadDialog open={open} mode={mode} handleClose={handleClose} />
    </>

  );
};