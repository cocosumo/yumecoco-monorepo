import { LoadingButton } from '@mui/lab';
import { Stack, TextField, TextFieldProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useField, useFormikContext } from 'formik';

export const FormikSearchField = (
  inputProps : TextFieldProps,
) => {
  const {
    name = 'mainSearch',
    fullWidth = true,
  } = inputProps;
  const { submitForm, isSubmitting } = useFormikContext();
  const [field] = useField(name);


  return (
    <Stack direction={'row'} spacing={1}>
      <TextField
        {...inputProps}
        {...field}
        onKeyUp={(e)=>{
          if (e.key === 'Enter') {
            submitForm();
          }
        }}
        fullWidth={fullWidth}
      />
      <LoadingButton
        variant='contained'
        onClick={submitForm}
        loading={isSubmitting}
      >
        <SearchIcon fontSize='large' />
      </LoadingButton>
    </Stack>
  );
};