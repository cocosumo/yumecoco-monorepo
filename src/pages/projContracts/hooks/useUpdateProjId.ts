import { useFormikContext } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackBar } from '../../../hooks';
import { getProjDataById } from '../api/getProjDataById';
import { fetchProjEstimatesById, getProjEstimatesDataById } from '../api/getProjEstimatesDataById';
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

  useEffect(() => {
    if (projEstimateId) {
      setStatusSafe('busy');
      getProjEstimatesDataById(estimatesRec, projEstimateId)
        .then((formData) => {
          setValues((prev) => ({ ...prev, formData }));
        })
        .finally(() => () => setStatusSafe(''));

    }
  },
  /* estimatesRec is object, unstable as dependency */
  [projEstimateId]);

  return {
    isWithEstimates,
    estimatesRec,
    formStatus,
    values,
  };
};