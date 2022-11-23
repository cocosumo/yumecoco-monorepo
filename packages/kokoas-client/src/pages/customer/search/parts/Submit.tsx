
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFormikContext } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useIsFetching } from '@tanstack/react-query';


export const Submit = () => {
  const { submitForm } = useFormikContext();
  const isFetching = useIsFetching();

  return (
    <Grid container item xs={12}
      md={4} justifyContent="center"
    >
      <LoadingButton
        fullWidth
        loading={!!isFetching}
        onClick={submitForm}
        variant="contained"
        loadingPosition="center"
      >
        <SearchIcon />
        {' '}
        検索
      </LoadingButton>

    </Grid>
  );
};