import { Stack, Zoom } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../form';
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
  const [envStatus, estimateId] = useWatch<TypeOfForm>({
    name: ['envStatus', 'estimateId'],
  });
  const loading = useIsFetching();
  const mutating = useIsMutating();

  return (
    <FormActionsContainer>
      <Zoom
        in={
          !mutating // 保存中じゃない
          && !loading // データ取得中じゃない
          && !envStatus // 契約ない
          && !!estimateId // 見積番号あり
}
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