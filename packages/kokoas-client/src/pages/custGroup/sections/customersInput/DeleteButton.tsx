import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export const DeleteButton = ({
  onClick,
}:{
  onClick: () => void,
}) => {
  return (
    <Tooltip title={'顧客を削除'}>
      <IconButton
        color='error'
        onClick={onClick}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};