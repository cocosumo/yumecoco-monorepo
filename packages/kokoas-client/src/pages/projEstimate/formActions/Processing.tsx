import { Box, LinearProgress, Zoom } from '@mui/material';
import { useIsMutating } from '@tanstack/react-query';
import { FormActionsContainer } from './FormActionsContainer';

export const Processing = () => {
  const mutating = useIsMutating();

  return (

    <FormActionsContainer>
      <Zoom in={!!mutating}>
        <Box sx={{ width: '250px' }}>
          処理中…
          <LinearProgress />
        </Box>
      </Zoom>
    </FormActionsContainer>

  );
};