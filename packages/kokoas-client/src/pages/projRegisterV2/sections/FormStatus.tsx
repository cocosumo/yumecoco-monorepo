import { Alert } from '@mui/material';
import { useTypedFormState } from '../hooks/useTypedRHF';

export const FormStatus = () => {
  const { dirtyFields } = useTypedFormState();

  const isDirty = !!Object.values(dirtyFields).length;

  return (
    <>
      {isDirty && (
        <Alert severity="warning">
          未保存の変更があります。
        </Alert>
      )}
    </>
  );
};