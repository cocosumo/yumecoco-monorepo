import { Alert, Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import { useSubmitHandler } from '../hooks/useSubmitHandler';
import { useFormState } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { useMemo } from 'react';

export const FormActions = () => {
  const handleSubmit = useSubmitHandler();
  const {
    isDirty,
    isValid,
    isValidating, 
  } = useFormState<TypeOfForm>();

  const errorMessage = useMemo(() => {
    if (isDirty)
      return '保存されていない変更があります。保存してください。';
    if (!isValid)
      return 'フォームにエラーがあります。保存ボタンを押すと、エラー箇所が分かります。';
    if (isValidating)
      return '処理中です。';
  }, [
    isDirty,
    isValid,
    isValidating, 
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
        //disabled={isSaveDisabled}
      >
        保存
      </Button>

      <Button
        variant="outlined"
        size="large"
        startIcon={<PreviewIcon />}
        disabled={isDirty}
      >
        プレビュー
      </Button>

      {errorMessage && (
      <Alert severity="error" >
        {errorMessage}
      </Alert>
      )}

      
    </Stack>
  );
};