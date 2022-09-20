import { useFormikContext } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackBar } from '../../../hooks';
import { getFormDataById } from '../api/fetchRecord';
import { getKintoneProjEstimates } from '../api/getKintoneProjEstimates';
import {  TypeOfForm } from '../form';

export const useUpdateProjId = () => {
  const [estimatesRec, setEstimatesRec] = useState<ProjectEstimates.SavedData[]>([]);
  const { setSnackState } = useSnackBar();

  const isWithEstimates = Boolean(estimatesRec.length);

  const {
    values,
    setValues,
    setStatus,
    status,
  } = useFormikContext<TypeOfForm>();

  const { projId } = values;
  const formStatus: TFormStatus = status;

  const setStatusSafe = useCallback((s: TFormStatus) => setStatus(s), [setStatus]);

  const memSetSnackState = useMemo(() => setSnackState, []);


  useEffect(()=>{
    if (projId) {

      setStatusSafe('busy');

      Promise.all([
        getFormDataById(projId),
        getKintoneProjEstimates(projId),
      ])
        .then(([formData, _estimatesRecord]) => {

          setValues( (prev) => {
            const { projEstimateId } = prev;

            const isValidProjEstimatesId = _estimatesRecord
              .some(({ レコード番号: dbProjEstimatesId }) =>
                dbProjEstimatesId.value ===  projEstimateId);

            return {
              ...prev,
              ...formData,

              /** 現在の見積番号は取得した見積もりにない場合、リセットする。*/
              projEstimateId: isValidProjEstimatesId ? projEstimateId : '',
            };
          });

          setEstimatesRec(_estimatesRecord);

        })
        .catch((err) => {
          memSetSnackState({
            open: true,
            message: `レコード取得にエラーが発生しました。${err.message}`,
            severity: 'error',
          });
        })
        .finally(() => setStatusSafe(''));

    } else {
      setStatusSafe('');
      setEstimatesRec([]);
    }
  },
  [projId, setStatusSafe, setValues, memSetSnackState ]);

  return {
    isWithEstimates,
    estimatesRec,
    formStatus,
    values,
  };
};