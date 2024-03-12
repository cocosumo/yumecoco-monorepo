import { Box, Button, Paper, Stack } from '@mui/material';
import { GoToContractButton } from '../navigationComponents/GoToContractButton';
import SaveIcon from '@mui/icons-material/Save';
import { UnsavedMidumori } from './UnsavedMidumori';

export const ActionButtons = ({
  handleSubmit,
}:{
  handleSubmit: () => void
}) => {

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
        <UnsavedMidumori />
      </Stack>

    </Box>
 
  );
};