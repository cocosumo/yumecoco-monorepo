import { Alert } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { useMemo } from 'react';

export const FormActionsAlert = () => {
  const {
    formState,
    control,
  } = useFormContext<TypeOfForm>();
  // as of this wrting, useFormState's isDirty is not working

  const {
    isValidating,
    isDirty,
  } = formState;


  const [
    contractId,
  ] = useWatch({
    control,
    name: [
      'contractId',
    ],
  });


  const errorMessage = useMemo(() => {
    if (isDirty)
      return '保存されていない変更があります。保存してください。';
    if (isValidating)
      return '処理中です。';
    if (!contractId)
      return '保存されるまで、プレビューが出来ません。';
  }, [
    isDirty,
    isValidating, 
    contractId,
  ]);

  
  return (
    <>
      {errorMessage && (
      <Alert severity="error" >
        {errorMessage}
      </Alert>
      )}
    </>
  );
};