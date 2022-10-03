import { Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { useState } from 'react';
import { ContractPreview } from '../ContractPreview';
import { isEmpty } from 'lodash';

export const PaymentFormActions = () => {
  const [openPreview, setOpenPreview] = useState(false);
  const { values, submitForm, validateForm, isSubmitting, isValidating } = useFormikContext<TypeOfForm>();

  const handleSubmit = async (submitMethod: TypeOfForm['submitMethod']) => {

    const  newErrors = await validateForm({ ...values, submitMethod });
    await submitForm();

    if (isEmpty(newErrors)) {
      setOpenPreview(true);
    }

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
      <ContractPreview
        open={openPreview}
        handleClose={()=>setOpenPreview(false)}
      />
    </Stack>
  );
};