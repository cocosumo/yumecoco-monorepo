import { Box, LinearProgress, Zoom } from '@mui/material';
import { FormActionsContainer } from './FormActionsContainer';

export const Processing = ({
  throttle,
}: {
  throttle: boolean
}) => {
  return (

    <FormActionsContainer>
      <Zoom in={throttle} mountOnEnter unmountOnExit>
        <Box sx={{ width: '250px' }}>
          処理中…
          <LinearProgress />
        </Box>
      </Zoom>
    </FormActionsContainer>

  );
};