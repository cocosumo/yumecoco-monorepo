import { IconButton, IconButtonProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const CloseButton = (
  props: IconButtonProps,
) => {
  return (
    <IconButton {...props}>
      <CloseIcon />
    </IconButton>
  );
};