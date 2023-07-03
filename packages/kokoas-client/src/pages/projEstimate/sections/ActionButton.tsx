import { Alert, Button, Stack } from '@mui/material';
import { GoToContractButton } from '../navigationComponents/GoToContractButton';
import SaveIcon from '@mui/icons-material/Save';
import { useFormState } from 'react-hook-form';

export const ActionButtons = ({
  handleSubmit,
}:{
  handleSubmit: () => void
}) => {
  const  {
    isDirty,
  } = useFormState();
  
  

  return (
    <>
      <Stack 
        direction="row" 
        spacing={2}
      >
        <Button
          variant='outlined'
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
        >
          保存
        </Button>
        <GoToContractButton  />
      </Stack>
      {isDirty && (
      <Alert severity='warning'>
        保存されていないデータがあります。保存してください。
      </Alert>) }

    </>
 
  );
};