import { Box, Button, Paper } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useSaveForm } from '../hooks/useSaveForm';
import { useSaveHotkey } from '../hooks/useSaveHotkey';

export const FooterActionButtons = () => {

  const { handleSubmit } = useSaveForm();
  useSaveHotkey(handleSubmit, { disabled: false });

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

      <Button
        variant='contained'
        startIcon={<SaveIcon />}
        onClick={handleSubmit}
      >
        保存
      </Button>

     

    </Box>
 
  );
};