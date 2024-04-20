import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const CloseButton = ({
  handleClose,
}: {
  handleClose: () => void,
}) => {

  return (
    <IconButton
      aria-label="close"
      onClick={handleClose}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};