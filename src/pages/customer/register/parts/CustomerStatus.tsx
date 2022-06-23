import { Alert, Grid, Button } from '@mui/material';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { useField } from 'formik';
import { CustomerForm, CustomerFormKeys } from '../form';
import { useConfirmDialog, useSnackBar } from '../../../../hooks';

type TIsDeleted = CustomerForm['isDeleted'];


export const CustomerStatus = () => {
  const [,, helper] = useField<TIsDeleted>({ name: ('isDeleted' as  CustomerFormKeys) });
  const { setDialogState } = useConfirmDialog();
  const { setSnackState } = useSnackBar();

  const handleUndelete = () => {
    helper.setValue('0');
    setSnackState({
      open: true,
      severity: 'warning',
      message: '「削除」状態の解除は保存されるまで確定しません。',
      autoHideDuration: 20000,
    });
  };

  const handleClickUndelete = () => {
    setDialogState({
      title: '操作確認',
      content: '復帰しますか。保存されるまで反映しません。',
      handleYes: handleUndelete,
    });
  };

  return (

    <Grid container item xs={12} spacing={2} >
      <Grid item xs={12} md={6}>
        <Alert
        severity='warning'
        action={
          <Button
            onClick={handleClickUndelete}
            color="inherit"
            size="small"
            startIcon={<SettingsBackupRestoreIcon />}
            >
            復帰
          </Button>
        }
      >
          「削除」状態になっています。
        </Alert>

      </Grid>

    </Grid>);
};