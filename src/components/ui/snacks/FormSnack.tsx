
import { Alert, Snackbar } from '@mui/material';

import { CustRegSnackProp } from '../../../pages/customer/register/CustomerRegistration';

interface FormSnackProps {
  snackState : CustRegSnackProp
  handleClose: ()=>void,

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