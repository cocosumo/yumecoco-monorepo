import { generateParams } from 'kokoas-client/src/helpers/url';
import { useConfirmDialog, useSnackBar } from 'kokoas-client/src/hooks';
import { useStableNavigate } from 'kokoas-client/src/hooks/useStableNavigate';
import { useSaveEstimate } from 'kokoas-client/src/hooksQuery';
import { useCallback } from 'react';
import { SubmitErrorHandler, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { convertToKintone } from '../api/convertToKintone';
import { TypeOfForm } from '../form';
import { BtnSaveChoices } from '../formActions/BtnSaveChoices';

export type SaveButtonNames = 'temporary' | 'save';

export type UseSaveForm = ReturnType<typeof useSaveForm>;

export const useSaveForm = ({
  handleSubmit,
}: UseFormReturn<TypeOfForm>) => {


  const { setSnackState } = useSnackBar();
  const {
    handleClose,
    setDialogState,
  } = useConfirmDialog();
  const { mutateAsync: saveMutation } = useSaveEstimate();
  const navigate = useStableNavigate();

  const handleSave = useCallback(async (
    data: TypeOfForm,
  ) => {
    const {
      estimateId,
    } = data;
    const record = convertToKintone(data);

    const { id, revision } = await saveMutation({
      recordId: estimateId,
      record,
      relatedData: {
        projDataId: data.projDataId,
      },
    });
    setSnackState({
      open: true,
      severity: 'success',
      message: `保存しました。 更新回数：${revision}`,
    });

    return {
      id,
      revision,
    };
  }, [saveMutation, setSnackState]);

  const onSubmitValid: SubmitHandler<TypeOfForm> = useCallback(async (data) => {
    const { id } = await handleSave(data);
    navigate(`?${generateParams({ projEstimateId: id })}`);
  }, [handleSave, navigate]);


  const onSubmitValidFinal: SubmitHandler<TypeOfForm> = useCallback( async (data) => {
    setDialogState({
      title: '編集した内容で保存します',
      content: (
        <BtnSaveChoices
          handleClose={handleClose}
          handleSave={() => handleSave(data)}
        />),
      withNo: false, withYes: false,
    });
  }, [setDialogState, handleClose, handleSave ]);

  const onSubmitInvalid: SubmitErrorHandler<TypeOfForm> = async () => {
    setSnackState({
      open: true,
      severity: 'error',
      message: '入力を確認してください',
    });
  };

  return {
    onSubmitValid,
    onSubmitInvalid,
    handleSubmit: handleSubmit(onSubmitValid, onSubmitInvalid),
    handleSubmitFinal: handleSubmit(onSubmitValidFinal, onSubmitInvalid),
    
  };
};