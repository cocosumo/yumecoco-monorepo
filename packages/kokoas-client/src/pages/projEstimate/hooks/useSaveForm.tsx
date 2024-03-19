import { generateParams } from 'kokoas-client/src/helpers/url';
import { useConfirmDialog, useSnackBar } from 'kokoas-client/src/hooks';
import { useStableNavigate } from 'kokoas-client/src/hooks/useStableNavigate';
import { useSaveEstimate } from 'kokoas-client/src/hooksQuery';
import isArray from 'lodash/isArray';
import { useCallback } from 'react';
import { 
  FieldError, 
  FieldErrorsImpl, 
  SubmitErrorHandler, 
  SubmitHandler, 
  UseFormReturn, 
} from 'react-hook-form';
import { convertToKintone } from '../api/convertToKintone';
import { BtnSaveChoices } from '../formActions/BtnSaveChoices';
import { ja } from './utils/fieldTranslations';
import { TForm } from '../schema';
import { useLocalStorage } from 'usehooks-ts';
import { localStorageFormRecoveryKey } from '../sections/UnsavedMitsumori';

export type SaveButtonNames = 'temporary' | 'save';

export type UseSaveForm = ReturnType<typeof useSaveForm>;

export const useSaveForm = ({
  handleSubmit,
}: UseFormReturn<TForm>) => {


  const { setSnackState } = useSnackBar();
  const {
    handleClose,
    setDialogState,
  } = useConfirmDialog();
  const { mutateAsync: saveMutation } = useSaveEstimate();
  const navigate = useStableNavigate();

  const [,setFormRecovery] = useLocalStorage(localStorageFormRecoveryKey, undefined);

  const handleSave = useCallback(async (
    data: TForm,
  ) => {
    const {
      estimateId,
    } = data;

    const activeEl = document.activeElement as HTMLElement;
    // add id to focusedEl
    if (activeEl) {
      activeEl.id = 'activeElement';
    }

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

      handleClose: () => {
        // return focus to the element that was focused before
        const returnFocusEl = document.getElementById('activeElement');
        returnFocusEl?.focus();

        if (returnFocusEl) {
          returnFocusEl.removeAttribute('id');
        } else {
          // If it is grid cell, focus on the cell
          const parentCell = activeEl.closest('div[role="gridcell"]');
          const parentRow = parentCell?.closest('div[role="row"]');
          // get aria-rowindex
          const rowIndex = parentRow?.getAttribute('aria-rowindex');

          // get aria-colindex
          const colIndex = parentCell?.getAttribute('aria-colindex');

          // select the cell
          const cellEl = document.querySelector(`div[role="grid"] div[aria-rowindex="${rowIndex}"] div[aria-colindex="${colIndex}"]`) as HTMLElement;

          if (cellEl) {
            cellEl.focus();
          }

          console.log(cellEl);
        }
        
      },
    });

    
    setFormRecovery(undefined);
    return {
      id,
      revision,
    };
  }, [saveMutation, setSnackState, setFormRecovery]);

  const onSubmitValid: SubmitHandler<TForm> = useCallback(async (data) => {
    const { id } = await handleSave(data);
    navigate(`?${generateParams({ projEstimateId: id })}`);
  }, [handleSave, navigate]);


  const onSubmitValidFinal: SubmitHandler<TForm> = useCallback( async (data) => {
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
    handleSubmitFinal: handleSubmit(onSubmitValidFinal, onSubmitInvalid),

  };
};