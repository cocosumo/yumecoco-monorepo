import { Alert, Grid, Button } from '@mui/material';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { useField } from 'formik';
import { TypeOfForm, KeyOfForm } from '../form';
import DeleteIcon from '@mui/icons-material/Delete';

type TIsDeleted = TypeOfForm['isDeleted'];


export const CustomerStatus = () => {
  const [field,, helper] = useField<TIsDeleted>({ name: ('isDeleted' as  KeyOfForm) });
  const reminderMessage = '「削除」状態の解除は保存されるまで確定しません。';

  const isDeleted = Boolean(+field.value);

  const handleUndelete = () => {
    helper.setValue((+!isDeleted).toString(), false);
    helper.setTouched(true, false);
  };

  const handleClickUndelete = () => {
    handleUndelete();
  };


  const message = isDeleted ? '「削除」状態になっています。保存出来ません。' : reminderMessage;


  return (

    <Grid
      container item
      xs={12}
      spacing={2}
      pb={2}
    >
      <Grid item xs={12} md={6}>
        <Alert
          severity={isDeleted ? 'info' : 'warning'}
          variant={isDeleted ? 'outlined' : 'filled'}
          action={

            <Button
              onClick={handleClickUndelete}
              color="inherit"
              size="small"
              startIcon={isDeleted ? <SettingsBackupRestoreIcon /> : <DeleteIcon />}
            >
              {isDeleted ? '復帰する' : '元に戻す'}
            </Button>
        }
        >
          {message}
        </Alert>

      </Grid>

    </Grid>);
};