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
    isValid,
    isValidating, 
  } = useFormState<TypeOfForm>();

  const [
    contractId,
    envelopeStatus,
  ] = useWatch<TypeOfForm>({
    name: [
      'contractId',
      'envelopeStatus',
    ],
  });

  const errorMessage = useMemo(() => {
    if (isDirty)
      return '保存されていない変更があります。保存してください。';
    if (!isValid)
      return 'フォームにエラーがあります。保存ボタンを押すと、エラー箇所が分かります。';
    if (isValidating)
      return '処理中です。';
    if (!contractId)
      return '保存されるまで、プレビューが出来ません。';
  }, [
    isDirty,
    isValid,
    isValidating, 
    contractId,
  ]);

  return (
    <Stack
      direction="row"
      spacing={2}
      pt={2}
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

      {contractId && !envelopeStatus && (
        <DeleteButton />
      )}

      {errorMessage && (
      <Alert severity="error" >
        {errorMessage}
      </Alert>
      )}

      
    </Stack>
  );
};