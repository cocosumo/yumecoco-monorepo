import { useFormikContext } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { getFormDataById } from '../api/fetchRecord';
import { getKintoneProjEstimates } from '../api/getKintoneProjEstimates';
import { TypeOfForm } from '../form';

export const useUpdateProjId = () => {
  const [estimatesRec, setEstimatesRec] = useState<ProjectEstimates.SavedData[]>([]);

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

  useEffect(()=>{
    if (projId) {
      setStatusSafe('busy');

      Promise.all([
        getFormDataById(projId),
        getKintoneProjEstimates(projId),
      ])
        .then(([formData, _estimatesRecord]) => {
          setValues((prev)=>({ ...prev, ...formData }));
          setEstimatesRec(_estimatesRecord);
          setStatusSafe('');
        });

    } else {
      setStatusSafe('');
    }
  },
  [projId, setStatusSafe, setValues]);

  return {
    isWithEstimates,
    estimatesRec,
    formStatus,
    values,
  };
};