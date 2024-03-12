import { Box, Button, Paper, Stack, Zoom } from '@mui/material';
import { GoToContractButton } from '../navigationComponents/GoToContractButton';
import SaveIcon from '@mui/icons-material/Save';
import { useFormState } from 'react-hook-form';
import { CustomAlert } from './CustomAlert';

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
      py={1}
      px={2} 
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
        alignItems={'center'}
      >
        <Button
          variant='contained'
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
        >
          保存
        </Button>
        <GoToContractButton  />
   
        <Zoom in={isDirty}>
          <CustomAlert severity='warning'>
            保存されていない変更があります。保存してください。
          </CustomAlert>
        </Zoom>
       
      </Stack>

    </Box>
 
  );
};