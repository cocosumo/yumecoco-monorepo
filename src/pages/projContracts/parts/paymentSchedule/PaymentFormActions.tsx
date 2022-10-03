import { Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
export const PaymentFormActions = () => {
  const { submitForm, setValues, validateForm } = useFormikContext<TypeOfForm>();

  const handleSubmit = (submitMethod: TypeOfForm['submitMethod']) => {
    setValues(prev => ({ ...prev, submitMethod }), true);
    validateForm()
      .then(()=>submitForm());
    
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
        >
          保存
        </Button>
        <Button 
          variant="outlined" 
          size="large" 
          startIcon={<PreviewIcon />}
          onClick={() => handleSubmit('contract')}
        >
          契約
        </Button>
      </Stack>
      {/* Error message here */}
  
    </Stack>
  );
};