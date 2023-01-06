import Popper, { PopperProps } from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { Alert } from '@mui/material';

export const  ErrorPopover = ({
  ancholErrEl,
  errorMessage,
}: {
  ancholErrEl: PopperProps['anchorEl']
  errorMessage?: string,
}) => {

  const open = !!(document.body.contains(ancholErrEl as HTMLInputElement)) && !!errorMessage;

  return (
  
    <Popper
      open={open}
      anchorEl={ancholErrEl}
      transition
      placement="bottom-start"
      sx={(theme) => ({
        zIndex: theme.zIndex.appBar + 1,
      })}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Alert severity='warning'>
            {errorMessage}
          </Alert>
        </Fade>
      )}
    </Popper>

  );
};
