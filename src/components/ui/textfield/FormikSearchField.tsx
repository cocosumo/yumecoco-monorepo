import { LoadingButton } from '@mui/lab';
import { Button, Stack, TextField, TextFieldProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useField, useFormikContext } from 'formik';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useBackdrop } from '../../../hooks';
import { useEffect } from 'react';

type SearchFieldProps = TextFieldProps & {
  onClickFilter?: () => void
};

export const FormikSearchField = (
  props : SearchFieldProps,
) => {
  const {
    name = 'mainSearch',
    fullWidth = true,
    onClickFilter,
    ...others
  } = props;
  const { setBackdropState } = useBackdrop();
  const { submitForm, isSubmitting } = useFormikContext();
  const [field] = useField(name);

  useEffect(() => {
    setBackdropState({ open: isSubmitting  });
  }, [isSubmitting, setBackdropState]);


  return (
    <Stack direction={'row'} spacing={1}>
      <TextField
        {...others}
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
      <Button
        variant={'contained'}
        onClick={onClickFilter}
      >
        <FilterListIcon />
      </Button>
    </Stack>
  );
};