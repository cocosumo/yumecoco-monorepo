import { Stack } from '@mui/material';
import { OrderMethodChoices } from './OrderMethodChoices';
import { EmailFields } from './EmailFields';

export const OrderMethod = () => {
  
  return (
    <Stack
      spacing={2}
      direction={'row'}
      py={2}
      px={2}
      borderRadius={1}
      border={'1px solid #e0e0e0'}
      sx={{
        '&:hover': {
          border: '1px solid black',
        },
        'transition': 'border 0.3s ease-in-out',
      }}
    >
      <OrderMethodChoices />
      <EmailFields />
    </Stack>
    
  );
};