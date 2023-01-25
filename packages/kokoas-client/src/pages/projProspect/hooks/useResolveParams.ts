import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { convertToForm } from '../api/convertToForm';
import { initialValues, TypeOfForm } from '../form';

export const useResolveParams = () => {
  const [initForm, setInitForm] = useState<TypeOfForm>(initialValues);

  const {
    projId: projIdFromURL,
  } = useURLParams();

  const { data: projRec } = useProjById(projIdFromURL || '');

  useEffect(() => {

    if (projIdFromURL && projRec) {
      setInitForm({
        ...initialValues,
        ...convertToForm(projRec),
      });
    } else {
      setInitForm(initialValues);
    }
  }, [projRec, projIdFromURL]);

  return initForm;
};