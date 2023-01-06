import { Stack, Zoom } from '@mui/material';
import { useIsMutating } from '@tanstack/react-query';
import { UseSaveForm } from '../hooks';
import { ProjEstimateShortcuts } from '../navigationComponents/ProjEstimateShortcuts';
import { BtnCancelEdit } from './BtnCancelEdit';
import { BtnSave } from './BtnSave';
import { BtnSaveTemporary } from './BtnSaveTemporary';
import { FormActionsContainer } from './FormActionsContainer';

export const ActionButtons = ({
  handleSubmit,
  handleSubmitFinal,
}:{
  handleSubmit: UseSaveForm['handleSubmit']
  handleSubmitFinal: UseSaveForm['handleSubmitFinal']
}) => {
  const mutating = useIsMutating();

  return (
    <FormActionsContainer>
      <Zoom
        in={!mutating}
        mountOnEnter
        unmountOnExit
      >
        <Stack spacing={1} direction={'row'} maxHeight={40}>
          <ProjEstimateShortcuts />
          <BtnSaveTemporary onClick={(e) => handleSubmit(e)} />
          <BtnSave onClick={(e) => handleSubmitFinal(e)} />
          <BtnCancelEdit />
        </Stack>
      </Zoom>

    </FormActionsContainer>
  );
};