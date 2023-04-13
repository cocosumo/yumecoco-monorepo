import { Alert, FormHelperText } from '@mui/material';
import { Stack } from '@mui/system';
import { useField } from 'formik';
import { KeyOfForm } from '../form';
import { AlertContent } from './AlertContent';

export const ExceedContractAmount = ({
  isBilled,
}:{
  isBilled: boolean
}) => {

  const fieldName: KeyOfForm = 'exceedChecked';
  const [field, meta] = useField(fieldName);

  
  const {
    error,
    touched,
  } = meta;


  return (
    <>
      <Alert
        severity="warning"
        icon={false}
        sx={{
          marginTop: '1em',
        }}
      >
        <Stack direction={'row'}>
          <AlertContent
            checkboxVal={field.value}
            isError={!!error && touched}
            isBilled={isBilled}
          />
        </Stack>
      </Alert>
      {error && touched &&
        <FormHelperText error={!!error && touched}>
          チェックが入っていません
        </FormHelperText>}
    </>
  );
};