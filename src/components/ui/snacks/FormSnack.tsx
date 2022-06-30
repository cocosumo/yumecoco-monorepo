
import { Alert, Snackbar, AlertColor } from '@mui/material';



export interface SnackState {
  open: boolean,
  severity?: AlertColor,
  message?: string,
  autoHideDuration?: number,
  handleClose?: ()=>void
}

interface FormSnackProps {
  snackState : SnackState
  handleClose?: ()=>void,

}


export const FormSnack : React.FC<FormSnackProps> = ({ snackState, handleClose }) => {

  const {
    open,
    message,
    severity,
    autoHideDuration = 2000,
  }  = snackState;

  return (
    <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={open}
    autoHideDuration={autoHideDuration}

    onClose={handleClose}
    sx={{ zIndex: 5001 }}
  >
      <Alert variant='filled' onClose={handleClose} severity={severity} sx={{ width: '100%' }} >
        {message}
      </Alert>

    </Snackbar>
  );
};

export default FormSnack;