import { MenuItem } from '@mui/material';

export const MenuVoidContract = (
  props: {
    handleClose: () => void
  },
) => {
  const { handleClose } = props;
  const handleVoidContract = () => {

    handleClose();
  };



  return (
    <MenuItem onClick={handleVoidContract}>
      無効化
    </MenuItem>
  );
};