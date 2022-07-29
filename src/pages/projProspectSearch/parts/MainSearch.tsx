import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
import { FormikTextField } from '../../../components/ui/textfield';
import { getFieldName, TypeOfForm } from '../form';
import SearchIcon from '@mui/icons-material/Search';
import { useFormikContext } from 'formik';

export const MainSearch = () => {
  const { submitForm, isSubmitting } = useFormikContext<TypeOfForm>();

  return (
    <Grid item xs={12} >
      <Stack direction={'row'} spacing={1}>
        <FormikTextField
            name={getFieldName('mainSearch')}
            label={'検索'}
            />
        <LoadingButton
            variant='contained'
            onClick={submitForm}
            loading={isSubmitting}
            >
          <SearchIcon fontSize='large'/>
        </LoadingButton>
      </Stack>

    </Grid>

  );
};