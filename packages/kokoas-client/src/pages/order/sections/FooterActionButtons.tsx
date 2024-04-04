import { Box, Button, Paper, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import StoreIcon from '@mui/icons-material/Store';
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
        <Button
          variant='outlined'
          startIcon={<StoreIcon />}
          onClick={() => alert('開発中です')}
          color='primary'
        >
          登録
        </Button>

      </Stack>

    </Box>
 
  );
};