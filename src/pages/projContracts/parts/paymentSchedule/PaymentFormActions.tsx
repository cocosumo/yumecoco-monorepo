import { Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
export const PaymentFormActions = () => {
  const { submitForm, setValues, validateForm, isSubmitting, isValidating } = useFormikContext<TypeOfForm>();

  const handleSubmit = async (submitMethod: TypeOfForm['submitMethod']) => {
    setValues(prev => ({ ...prev, submitMethod }));
    await validateForm();
    await submitForm();
  };

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent={'center'}
        spacing={2}
        pt={2}
      >
        <Button
          variant="outlined"
          size="large"
          startIcon={<SaveIcon />}
          onClick={() => handleSubmit('normal')}
          disabled={isSubmitting || isValidating}
        >
          保存
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<PreviewIcon />}
          onClick={() => handleSubmit('contract')}
          disabled={isSubmitting || isValidating}
        >
          プレビュー
        </Button>
      </Stack>

    </Stack>
  );
};