import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';

export const ActionButtons = () => {

  const { submitForm } = useFormikContext<TypeOfForm>();

  return (
    <Button
      variant="contained"
      onClick={submitForm}
    >
      請求書発行
    </Button>
  );
};