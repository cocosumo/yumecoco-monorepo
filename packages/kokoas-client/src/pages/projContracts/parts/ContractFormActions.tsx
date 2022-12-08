import { Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { ContractDialog } from './Preview/ContractDialog';
import isEmpty from 'lodash/isEmpty';
import { useSnackBar } from '../../../hooks';
import { useState } from 'react';
import { useContractPreview } from '../hooks';

export const ContractFormActions = () => {
  const { setSnackState } = useSnackBar();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const {
    submitForm,
    isSubmitting,
    isValidating,
    isValid,
    errors,
    touched,
    values: {
      envelopeStatus,
    },
  } = useFormikContext<TypeOfForm>();


  const {
    previewUrl,
    handlePreview,
    handleRefetch,
    formLoading,
  } = useContractPreview();

  const setOpenPreview = (isOpen: boolean) => {
    setIsPreviewOpen(isOpen);
    handlePreview();
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

    if (submitMethod === 'contract') {
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
          disabled={isSubmitting || isValidating || !!envelopeStatus}
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
        formLoading={formLoading}
        handleRefetch={handleRefetch}
        previewUrl={previewUrl}
        handleClose={() => setOpenPreview(false)}
      />
    </Stack>
  );
};