import { AndpadButton } from 'kokoas-client/src/components/ui/buttons/AndpadButton';
import SaveIcon from '@mui/icons-material/Save';

export const SaveToAndpadButton = () => {

  return (
    <AndpadButton
      fullWidth sx={{ height: '100%' }}
      startIcon={<SaveIcon />}
    >
      アンドパッドへ登録
    </AndpadButton>
  );
};