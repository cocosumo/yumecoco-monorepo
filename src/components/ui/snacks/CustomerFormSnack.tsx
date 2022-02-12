
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { CustomerGroupForm } from '../../../types/forms';

interface CustomerFormSnackProps {
  open: boolean,
  handleClose: ()=>void,
  formState: CustomerGroupForm
}

const CustomerFormSnack : React.FC<CustomerFormSnackProps> = ({ open, handleClose, formState }) => {
  console.log(formState, 'FORMSTATE');
  const { submitState } = formState;
  let message = '何かがおきました。';
  let severity : AlertColor = 'info';

  switch (submitState) {
    case 'VALIDATE':
      message = 'フォームを確認中です。';
      break;
    case 'FETCHING':
      message = 'サーバとやり途中です。';
      break;
    case 'SUCCESS':
      message = '保存が出来ました。';
      severity = 'success';
      break;
    case 'VALIDATE_ERROR':
      message = '入力内容を確認してください。';
      severity = 'error';
      break;
    case 'FETCH_ERROR':
      message = 'エラーが発生しました。';
      severity = 'error';
  }




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