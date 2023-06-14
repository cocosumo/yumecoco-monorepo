import EditIcon from '@mui/icons-material/Edit';
import { ActionButton, ActionButtonProps } from './ActionButton';

export const EditButton = (props:ActionButtonProps) => {
  return (
    <ActionButton
      {...props}
      startIcon={<EditIcon />}
    >
      編集
    </ActionButton>

  );
};