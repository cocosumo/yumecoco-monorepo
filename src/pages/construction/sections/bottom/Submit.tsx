
import { Button, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useFormikContext } from 'formik';


export const Submit = () => {
  const { isSubmitting } = useFormikContext();
  return (
    <Grid container item xs={12} justifyContent="center">
      <Button
        disabled={isSubmitting}
        type={'submit'}
        variant="contained"
        size="large"
        startIcon={<SaveIcon/>}
      >
        登録
      </Button>
    </Grid>
  );
};