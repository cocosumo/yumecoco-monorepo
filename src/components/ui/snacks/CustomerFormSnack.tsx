
import { Alert, Snackbar } from '@mui/material';

import { CustRegSnackProp } from './../../../pages/customer/register/CustomerRegistration';

interface CustomerFormSnackProps {
  snackState : CustRegSnackProp
  handleClose: ()=>void,

}

const CustomerFormSnack : React.FC<CustomerFormSnackProps> = ({ snackState, handleClose }) => {

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

export default CustomerFormSnack;