import { Button, Stack, Typography } from '@mui/material';
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
    dirty,
    values: {
      envelopeStatus,
    },
  } = useFormikContext<TypeOfForm>();

  const {
    previewUrl,
    handlePreview,
    handleRefetch,
    formLoading,
    selectedDoc,
  } = useContractPreview();

  const setOpenPreview = (isOpen: boolean) => {
    setIsPreviewOpen(isOpen);
    handlePreview();
  };


  const handleSubmit = async () => {
    if (isEmpty(touched) && isEmpty(errors) && !dirty) {
      setSnackState({
        open: true,
        severity: 'info',
        message: 'フォームに変更がありません。',
      });
    } else {
      await submitForm();
    }

  };

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };


  const isFormikBusy = isSubmitting || isValidating;

  const isPreviewDisabled = isFormikBusy
    || (!isValid && !envelopeStatus) // 検証ロジックが異なる既存契約の後方互換性を処理するためのものです。
    || dirty;

  const isSaveDisabled = isFormikBusy;

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
          onClick={() => handleSubmit()}
          disabled={isSaveDisabled}
        >
          保存
        </Button>

        <Button
          variant="outlined"
          size="large"
          startIcon={<PreviewIcon />}
          onClick={handleOpenPreview}
          disabled={isPreviewDisabled}
        >
          プレビュー
        </Button>
      </Stack>
      <ContractDialog
        open={isPreviewOpen}
        formLoading={formLoading}
        selectedDoc={selectedDoc}
        handleRefetch={handleRefetch}
        handlePreview={handlePreview}
        previewUrl={previewUrl}
        handleClose={() => setOpenPreview(false)}
      />
      <Typography variant='caption' color={'error'} align="center"
        component={'div'}
      >

        {isPreviewDisabled && isFormikBusy && <div>
          処理中です。
        </div>}

        {isPreviewDisabled && !isValid && !envelopeStatus && <div>
          フォームにエラーがあります。保存ボタンを押すと、エラー箇所が分かります。
        </div>}

        {isPreviewDisabled && dirty && <div>
          保存されていない変更があります。保存してください。
        </div>}

      </Typography>
    </Stack>
  );
};