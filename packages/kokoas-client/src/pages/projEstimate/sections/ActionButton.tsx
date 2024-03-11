import { Alert, Box, Button, Paper, Stack } from '@mui/material';
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
    <Box 
      component={Paper}
      p={2} 
      position={'sticky'}
      bottom={8}
      elevation={4}
      zIndex={50}
      sx={{
        transition: 'all 0.3s ease-in-out',
        opacity: 0.8,
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      <Stack 
        direction="row" 
        spacing={2}
      >
        <Button
          variant='contained'
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

    </Box>
 
  );
};