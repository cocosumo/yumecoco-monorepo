import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedHooks';
import { Box } from '@mui/material';

export const Birthdate = ({
  index,
}:{
  index: number,
}) => {
  const { control } = useTypedFormContext();
  
  return (
    <Box
      sx={{ 
        bgcolor: 'background.paper',
        border: '1px solid',
        //borderColor: error ? 'red' : 'grey.500',
        borderRadius: 1,
        p: '2px 4px', 
        display: 'flex', 
        alignItems: 'center', 
      }}
    >
      Hello
    </Box>
  );
};