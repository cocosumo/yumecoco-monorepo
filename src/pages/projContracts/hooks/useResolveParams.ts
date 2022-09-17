import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { getParam } from '../../../helpers/url';
import { TypeOfForm } from '../form';

export const useResolveParams = () => {
  const projIdFromURL = getParam('projId');
  const projEstimateIdFromURL = getParam('projEstimateId');

  const {
    setValues,
  } = useFormikContext<TypeOfForm>();

  useEffect(()=>{
    /* URLで渡された時の副作用 */
    if (projIdFromURL) {
      setValues((prev)=>({
        ...prev,
        projEstimateId: projEstimateIdFromURL ?? '',
        projId: projIdFromURL,
      }));
    }
  }, [projIdFromURL, projEstimateIdFromURL, setValues]);
};