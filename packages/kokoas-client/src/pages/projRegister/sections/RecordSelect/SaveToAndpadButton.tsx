import { AndpadButton } from 'kokoas-client/src/components/ui/buttons/AndpadButton';
import SaveIcon from '@mui/icons-material/Save';
import { Tooltip, Zoom } from '@mui/material';

export const SaveToAndpadButton = (
  {
    show,
  }:{
    show : boolean
  },
) => {

  return (
    <Zoom in={show}>
      <Tooltip title={'Anpadへ案件を登録します'}>

        <AndpadButton
          fullWidth sx={{ height: '100%' }}
          startIcon={<SaveIcon />}
        >
          アンドパッドへ登録
        </AndpadButton>

      </Tooltip>
    </Zoom>
  );
};