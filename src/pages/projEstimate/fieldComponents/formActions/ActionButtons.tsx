import { Stack, Zoom } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { BtnCancelEdit } from './BtnCancelEdit';
import { BtnSave } from './BtnSave';
import { BtnSaveTemporary } from './BtnSaveTemporary';
import { FormActionsContainer } from './FormActionsContainer';

export const ActionButtons = () => {
  const { isSubmitting } = useFormikContext<TypeOfForm>();

  return (
    <FormActionsContainer>
      <Zoom in={!isSubmitting} mountOnEnter unmountOnExit>
        <Stack spacing={1} direction={'row'}>
          <BtnSaveTemporary />
          <BtnSave />
          <BtnCancelEdit />
        </Stack>
      </Zoom>
    </FormActionsContainer>
  );
};