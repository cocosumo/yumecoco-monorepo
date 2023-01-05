import { generateParams } from 'kokoas-client/src/helpers/url';
import { useConfirmDialog, useSnackBar } from 'kokoas-client/src/hooks';
import { useSaveEstimate } from 'kokoas-client/src/hooksQuery';
import { SubmitErrorHandler, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ButtonSubmitEvent } from 'types';
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
  const navigate = useNavigate();

  const handleSave = async (
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
  };

  const onSubmitValid: SubmitHandler<TypeOfForm> = async (data, e) => {

    const saveButtonName = (e as ButtonSubmitEvent<SaveButtonNames> )?.nativeEvent?.submitter?.name;

    if (!saveButtonName || saveButtonName === 'temporary') {
      const { id } = await handleSave(data);
      navigate(`?${generateParams({ projEstimateId: id })}`);
    } else {
      setDialogState({
        title: '編集した内容で保存します',
        content: (
          <BtnSaveChoices
            handleClose={handleClose}
            handleSave={() => handleSave(data)}
          />),
        withNo: false, withYes: false,
      });
    }

  };

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
  };
};