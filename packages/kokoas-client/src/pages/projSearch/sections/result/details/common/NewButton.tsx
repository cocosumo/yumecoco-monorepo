import AddBoxIcon from '@mui/icons-material/AddBox';
import { ActionButton, ActionButtonProps } from './ActionButton';

export const NewButton = (props:ActionButtonProps) => {
  return (
    <ActionButton
      {...props}
      startIcon={<AddBoxIcon />}
      color={'success'}
    >
      新規
    </ActionButton>

  );
};