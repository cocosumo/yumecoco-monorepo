
import { Alert, Snackbar, AlertColor } from '@mui/material';
import { ReactNode } from 'react';



export interface SnackState {
  open: boolean,
  severity?: AlertColor,
  message?: ReactNode,
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