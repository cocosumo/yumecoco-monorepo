import { Box, LinearProgress } from '@mui/material';
import { FormActionsContainer } from './FormActionsContainer';

export const Processing = () => {

  return (

    <FormActionsContainer>

      <Box sx={{ width: '250px' }}>
        処理中…
        <LinearProgress />
      </Box>

    </FormActionsContainer>

  );
};