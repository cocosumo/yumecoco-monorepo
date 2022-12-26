import { Stack, Zoom } from '@mui/material';
import { useIsMutating } from '@tanstack/react-query';
import { ProjEstimateShortcuts } from '../../projEstimate/navigationComponents/ProjEstimateShortcuts';
import { BtnCancelEdit } from './BtnCancelEdit';
import { BtnSave } from './BtnSave';
import { BtnSaveTemporary } from './BtnSaveTemporary';
import { FormActionsContainer } from './FormActionsContainer';

export const ActionButtons = () => {
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
          <BtnSaveTemporary />
          <BtnSave />
          <BtnCancelEdit />
        </Stack>
      </Zoom>

    </FormActionsContainer>
  );
};