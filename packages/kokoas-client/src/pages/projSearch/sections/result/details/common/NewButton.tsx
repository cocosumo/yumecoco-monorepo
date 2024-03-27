import AddBoxIcon from '@mui/icons-material/AddBox';
import { ActionButton, ActionButtonProps } from './ActionButton';

export const NewButton = (props: ActionButtonProps) => {
  const {
    children = '新規',
  } = props;
  return (
    <ActionButton
      {...props}
      startIcon={<AddBoxIcon />}
    >
      {children}
    </ActionButton>

  );
};