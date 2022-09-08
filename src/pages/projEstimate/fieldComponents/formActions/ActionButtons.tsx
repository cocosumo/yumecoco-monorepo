import { Stack, Zoom } from '@mui/material';
import { BtnCancelEdit } from './BtnCancelEdit';
import { BtnSave } from './BtnSave';
import { BtnSaveTemporary } from './BtnSaveTemporary';
import { FormActionsContainer } from './FormActionsContainer';

export const ActionButtons = ({
  handleSave, throttle,
}: {
  throttle: boolean,
  handleSave: () => void
}) => {
  return (
    <FormActionsContainer>
      <Zoom in={!throttle} mountOnEnter unmountOnExit>
        <Stack spacing={1} direction={'row'}>
          <BtnSaveTemporary handleSave={handleSave} throttle={throttle} />
          <BtnSave handleSave={handleSave} throttle={throttle} />
          <BtnCancelEdit throttle={throttle} />
        </Stack>
      </Zoom>
    </FormActionsContainer>
  );
};