import { Alert, Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useSubmitHandler } from '../hooks/useSubmitHandler';
import { useFormState, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { useMemo } from 'react';
import { PreviewButton } from '../parts/preview/PreviewButton';
import { DeleteButton } from '../parts/DeleteButton';

export const FormActions = () => {
  const handleSubmit = useSubmitHandler();
  const {
    isDirty,
    isValidating, 
  } = useFormState<TypeOfForm>();

  const [
    contractId,
  ] = useWatch<TypeOfForm>({
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
      <Stack
        direction="row"
        spacing={2}
        py={2}
        alignItems={'center'}
      >
        <Button
          variant="outlined"
          size="large"
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
        >
          保存
        </Button>

        {contractId && (
        <PreviewButton disabled={isDirty} />
        )}

     
        <DeleteButton />

      </Stack>

      {errorMessage && (
      <Alert severity="error" >
        {errorMessage}
      </Alert>
      )}
    </>
    
  );
};