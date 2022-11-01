
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFormikContext } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';


export const Submit = () => {
  const { isSubmitting, submitForm } = useFormikContext();
  const [isThrottle, setIsThrottle] = useState(false);
  const handleSubmit = () => {
    setIsThrottle(true);
    setTimeout(async ()=>{
      await submitForm();
      setIsThrottle(false);
    }, 800);

  };

  const loading = isThrottle || isSubmitting;

  return (
    <Grid container item xs={12}
      md={4} justifyContent="center"
    >
      <LoadingButton
        fullWidth
        loading={loading}
        onClick={handleSubmit}
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