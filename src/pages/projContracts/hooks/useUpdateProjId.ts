import { useFormikContext } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackBar } from '../../../hooks';
import { getFormDataById } from '../api/fetchRecord';
import { getKintoneProjEstimates } from '../api/getKintoneProjEstimates';
import { initialValues, TypeOfForm } from '../form';

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
          setValues( { ...initialValues, ...formData } );
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