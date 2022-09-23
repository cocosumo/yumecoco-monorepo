import { useFormikContext } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackBar } from '../../../hooks';
import { getProjDataById } from '../api/getProjDataById';
import { fetchProjEstimatesById, getProjEstimatesDataById } from '../api/getProjEstimatesDataById';
import {  TypeOfForm } from '../form';
import useDeepCompareEffect from 'use-deep-compare-effect';

export const useUpdateProjId = () => {
  const [estimatesRec, setEstimatesRec] = useState<Estimates.main.SavedData[]>([]);
  const { setSnackState } = useSnackBar();

  const isWithEstimates = Boolean(estimatesRec.length);

  const {
    values,
    setValues,
    setStatus,
    status,
  } = useFormikContext<TypeOfForm>();

  const { projId, projEstimateId } = values;
  const formStatus: TFormStatus = status;

  const setStatusSafe = useCallback((s: TFormStatus) => setStatus(s), [setStatus]);

  const memSetSnackState = useMemo(() => setSnackState, []);


  useEffect(()=>{
    if (projId) {

      setStatusSafe('busy');

      Promise.all([
        getProjDataById(projId),
        fetchProjEstimatesById(projId),
      ])
        .then(([formData, _estimatesRecord]) => {

          setValues( (prev) => {
            const { projEstimateId: locProjEstimateId } = prev;

            /* Set estimateId is it exist in the new list of projEstimate records */
            const isValidProjEstimatesId = _estimatesRecord
              .some(({ レコード番号: dbProjEstimatesId }) =>
                dbProjEstimatesId.value ===  locProjEstimateId);

            return {
              ...prev,
              ...formData,

              projEstimateId: isValidProjEstimatesId ? locProjEstimateId : '',
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



  useDeepCompareEffect(() => {
    if (projEstimateId ) {

      getProjEstimatesDataById(estimatesRec, projEstimateId)
        .then((formData) => {
          /* 見積もりのものを */
          setValues((prev) => {
            return { ...prev, ...formData };
          });
        })
        .catch((err) => {
          memSetSnackState({
            open: true,
            message: `レコード取得にエラーが発生しました。${err.message}`,
            severity: 'error',
          });
        })
        .finally(() => setStatusSafe(''));
    }
  },
  /* estimatesRec is object, unstable as dependency */
  [projEstimateId, estimatesRec]);

  return {
    isWithEstimates,
    estimatesRec,
    formStatus,
    values,
  };
};