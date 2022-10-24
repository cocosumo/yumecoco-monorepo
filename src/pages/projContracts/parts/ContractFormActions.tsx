import { Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import { useFormikContext } from 'formik';
import { getFieldName, TypeOfForm } from '../form';
import { ContractDialog } from './Preview/ContractDialog';
import { isEmpty } from 'lodash';
import { useSnackBar } from '../../../hooks';

export const ContractFormActions = () => {

  const { setSnackState } = useSnackBar();
  const {
    submitForm,
    isSubmitting,
    isValidating,
    isValid,
    errors,
    touched,
    values : {
      isPreviewOpen,
    },
    setFieldValue,
  } = useFormikContext<TypeOfForm>();

  const setOpenPreview = (isOpen: boolean) => {
    setFieldValue(getFieldName('isPreviewOpen'), isOpen);
  };


  const handleSubmit = async (submitMethod: TypeOfForm['submitMethod']) => {

    if (isEmpty(touched) && isEmpty(errors)) {
      setSnackState({
        open: true,
        severity: 'info',
        message: 'フォームに変更がありません。',
      });
    }

    if (!isEmpty(touched) || !isEmpty(errors)) {
      await submitForm();
    }

    if (submitMethod === 'contract' ) {
      if (isEmpty(errors)) {
        setOpenPreview(true);
      }
    }

  };


  const isOpenDialog = isPreviewOpen && isValid;

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
      <ContractDialog
        open={isOpenDialog}
        handleClose={()=>setOpenPreview(false)}
      />
    </Stack>
  );
};