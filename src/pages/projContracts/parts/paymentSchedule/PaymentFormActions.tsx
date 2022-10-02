import { Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import { useFormikContext } from 'formik';
export const PaymentFormActions = () => {
  const { submitForm, dirty, isValid, touched } = useFormikContext();

  console.log(dirty, isValid, touched);

  const cantPreviewContract = !!dirty && !isValid;

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
          onClick={submitForm}
        >
          保存
        </Button>
        <Button 
          variant="outlined" 
          disabled={cantPreviewContract}
          size="large" 
          startIcon={<PreviewIcon />}
        >
          契約
        </Button>
      </Stack>
      {/* Error message here */}
  
    </Stack>
  );
};