import { Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { useState } from 'react';
import { ContractDialog } from '../Preview/ContractDialog';
import { isEmpty } from 'lodash';

export const PaymentFormActions = () => {
  const [openPreview, setOpenPreview] = useState(false);
  const {
    values,
    setValues,
    submitForm,
    validateForm,
    isSubmitting,
    isValidating,
    isValid,

  } = useFormikContext<TypeOfForm>();

  const handleSubmit = async (submitMethod: TypeOfForm['submitMethod']) => {
    /*
      setValues does not immediately reflect validation errors even if 2nd param is set to true.
      So I explicitly call validateForm against the new state before calling submit.

      This needs to be revisited. ~ras 2022.10.03
    */
    const newState = { ...values, submitMethod };

    setValues(newState);

    const newErrors = await validateForm(newState);
    await submitForm();

    if (submitMethod === 'contract' && isEmpty(newErrors)) {
      setOpenPreview(true);
    }

  };


  const isOpenDialog = openPreview && isValid;

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