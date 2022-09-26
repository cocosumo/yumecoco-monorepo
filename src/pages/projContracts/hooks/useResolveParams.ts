import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { getParam } from '../../../helpers/url';
import { TypeOfForm } from '../form';

/**
 * URLで渡されたものを処理する
 */
export const useResolveParams = () => {
  const projIdFromURL = getParam('projId');
  const projEstimateIdFromURL = getParam('projEstimateId');


  const {
    setValues,
  } = useFormikContext<TypeOfForm>();

  useEffect(()=>{

    if (projIdFromURL) {
      setValues((prev)=>({
        ...prev,
        projEstimateId: projEstimateIdFromURL ?? '',
        projId: projIdFromURL,
      }));
    }
  }, [projIdFromURL, projEstimateIdFromURL, setValues]);

  return {
    projEstimateIdFromURL,
    projIdFromURL,
  };
};