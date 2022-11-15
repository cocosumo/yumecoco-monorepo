import { getParam } from 'kokoas-client/src/helpers/url';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { convertToForm } from '../api/convertToForm';
import { initialValues, TypeOfForm } from '../form';

export const useResolveParams = () => {
  const [initForm, setInitForm] = useState<TypeOfForm>(initialValues);

  const projIdFromURL = getParam('projId');
  const { data: projRec } = useProjById(projIdFromURL || '');

  useEffect(() => {
    if (projIdFromURL && projRec) {
      setInitForm({
        ...initialValues,
        ...convertToForm(projRec),
      });
    }
  }, [projRec, projIdFromURL]);

  return initForm;
};