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
  const [field, meta, helpers] = useField(fieldName);

  
  const {
    error,
    touched,
  } = meta;

  const {
    setValue,
  } = helpers;

  const handleCheck = (e: any) => {
    setValue(e.target.checked);
  };


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
            onClick={handleCheck}
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