import { Box, LinearProgress, Zoom } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { FormActionsContainer } from './FormActionsContainer';

export const Processing = () => {
  const { isSubmitting } = useFormikContext<TypeOfForm>();

  return (

    <FormActionsContainer>
      <Zoom in={isSubmitting} mountOnEnter unmountOnExit>
        <Box sx={{ width: '250px' }}>
          処理中…
          <LinearProgress />
        </Box>
      </Zoom>
    </FormActionsContainer>

  );
};