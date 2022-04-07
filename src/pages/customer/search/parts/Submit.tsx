
import { Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFormikContext } from 'formik';


export const Submit = () => {
  const { isSubmitting } = useFormikContext();
  console.log('triggerd');
  return (
    <Grid container item xs={12} md={4} justifyContent="center">
      <Button

        key="submit"
        fullWidth
        disabled={isSubmitting}
        type={'submit'}
        variant="contained"
        size="large"
        startIcon={<SearchIcon/>}
      >
        検索
      </Button>
    </Grid>
  );
};