import { Chip } from '@mui/material';

export const NewIndicator = () => {
  return (
    <Chip 
      variant='outlined'
      color='success' 
      label={'新着'} 
      size='small'
      sx={{
        mr: 1,
      }}
    />
  );
};