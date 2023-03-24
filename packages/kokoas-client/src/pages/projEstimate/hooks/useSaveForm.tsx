import { generateParams } from 'kokoas-client/src/helpers/url';
import { useConfirmDialog, useSnackBar } from 'kokoas-client/src/hooks';
import { useStableNavigate } from 'kokoas-client/src/hooks/useStableNavigate';
import { useSaveEstimate } from 'kokoas-client/src/hooksQuery';
import isArray from 'lodash/isArray';
import { useCallback } from 'react';
import { FieldError, FieldErrorsImpl, SubmitErrorHandler, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { convertToKintone } from '../api/convertToKintone';
import { TypeOfForm } from '../form';
import { BtnSaveChoices } from '../formActions/BtnSaveChoices';
import { ja } from './utils/fieldTranslations';

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

  const onSubmitInvalid: SubmitErrorHandler<TypeOfForm> = async (errors) => {

    const itemErrors = Object
      .entries(errors)
      .reduce(
        (acc, [key, error]) => {

          if (isArray(error)) {
            (error as FieldErrorsImpl<TypeOfForm['items']>)
              .forEach((item, idx) => {
                if (!item) return;
                Object
                  .entries(item)
                  .forEach(([itemKey, itemError]) => {
                    const { 
                      message,
                      ref, 
                    } = itemError as FieldError;
                    acc.push(`${idx + 1}行目の${ja[itemKey as keyof typeof ja]}：${message}。値：${ref?.value}`);
                  });
              });
          } else {
            acc.push(`${ja[key as keyof typeof ja]}：${error.message}`);
          }

          return acc;
        }, [] as  string[]);

    setSnackState({
      open: true,
      severity: 'error',
      message: itemErrors
        .map((err) => (<p key={err}>
          {err}
        </p>)),
    });
  };

  return {
    onSubmitValid,
    onSubmitInvalid,
    handleSubmit: handleSubmit(onSubmitValid, onSubmitInvalid),
    handleSubmitFinal: handleSubmit(onSubmitValidFinal, onSubmitInvalid),

  };
};