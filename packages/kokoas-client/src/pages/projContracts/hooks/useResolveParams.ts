import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { TypeOfForm } from '..';
import { getParam } from '../../../helpers/url';

export const useResolveParams = () => {
  const { setValues } = useFormikContext<TypeOfForm>();
  const projIdFromURL = getParam('projId');
  const projEstimateIdFromURL = getParam('projEstimateId');

  useEffect(() => {

    setValues(prev => ({
      ...prev,
      projEstimateId: projEstimateIdFromURL ?? '',
      projId: projIdFromURL ?? '',
    }));

  }, [
    projEstimateIdFromURL,
    projIdFromURL,
    setValues,
  ]);
};