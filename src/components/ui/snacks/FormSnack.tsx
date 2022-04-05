
import { Alert, Snackbar, AlertColor } from '@mui/material';



export interface SnackState {
  open: boolean,
  severity?: AlertColor,
  message?: string
}

interface FormSnackProps {
  snackState : SnackState
  handleClose?: ()=>void,

}

const FormSnack : React.FC<FormSnackProps> = ({ snackState, handleClose }) => {

  const { open, message, severity }  = snackState;

  return (
    <Snackbar

    open={open}
    autoHideDuration={2000}
    onClose={handleClose}
  >
      <Alert variant='filled' onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>

    </Snackbar>
  );
};

export default FormSnack;