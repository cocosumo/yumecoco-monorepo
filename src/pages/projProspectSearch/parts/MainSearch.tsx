import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
import { FormikTextField } from '../../../components/ui/textfield';
import { getFieldName } from '../form';
import SearchIcon from '@mui/icons-material/Search';

export const MainSearch = () => {
  return (
    <Grid item xs={12} >
      <Stack direction={'row'} spacing={1}>
        <FormikTextField
            name={getFieldName('mainSearch')}
            label={'検索'}
            />
        <LoadingButton
            variant='contained'
            >
          <SearchIcon fontSize='large'/>
        </LoadingButton>
      </Stack>

    </Grid>

  );
};