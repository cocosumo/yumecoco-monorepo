import { generateParams } from 'kokoas-client/src/helpers/url';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { useStableNavigate } from 'kokoas-client/src/hooks/useStableNavigate';
import { useSaveOrderBudget } from 'kokoas-client/src/hooksQuery';
import isArray from 'lodash/isArray';
import { useCallback } from 'react';
import { 
  FieldError, 
  FieldErrorsImpl, 
  SubmitErrorHandler, 
  SubmitHandler, 
} from 'react-hook-form';
import { convertToKintone } from '../api/convertToKintone';
import { ja } from '../utils/fieldTranslations';
import { TForm } from '../schema';
import { refocus } from '../utils/refocus';
import { useTypedFormContext } from './useTypedRHF';

export type SaveButtonNames = 'temporary' | 'save';

export type UseSaveForm = ReturnType<typeof useSaveForm>;



export const useSaveForm = () => {

  const { handleSubmit } = useTypedFormContext();
  const { setSnackState } = useSnackBar();

  const { mutateAsync: saveMutation } = useSaveOrderBudget();
  const navigate = useStableNavigate();


  const handleSave = useCallback(async (
    data: TForm,
  ) => {
    const {
      projId,
    } = data;

    const activeEl = document.activeElement as HTMLElement;
    // add id to focusedEl
    if (activeEl) {
      activeEl.id = 'activeElement';
    }

    const record = convertToKintone(data);

    const { id, revision } = await saveMutation({
      recordId: projId,
      record,
      revision: data.revision,
    });

    setSnackState({
      open: true,
      severity: 'success',
      message: `保存しました。 更新回数：${revision}`,
      autoHideDuration: 500,
      handleClose: () => {
        refocus(activeEl, 'activeElement');
      },
      
    });

    return {
      id,
      revision,
    };
  }, [saveMutation, setSnackState]);

  const onSubmitValid: SubmitHandler<TForm> = useCallback(async (data) => {
    const { revision } = await handleSave(data);
    navigate(`?${generateParams({ projId: data.projId, revision: revision ?? null  })}`);
  }, [handleSave, navigate]);


  const onSubmitInvalid: SubmitErrorHandler<TForm> = async (errors) => {

    const itemErrors = Object
      .entries(errors)
      .reduce(
        (acc, [key, error]) => {

          if (isArray(error)) {
            (error as FieldErrorsImpl<TForm['items']>)
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
        }, [] as  string[],
      );

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
  };
};