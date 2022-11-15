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
    // If projEstimateId got passed, no need to save projId.
    if (projEstimateIdFromURL) {
      setValues((prev)=>({
        ...prev,
        estimateId: projEstimateIdFromURL,
      }));
    } else if (projIdFromURL) {
      setValues((prev)=>({
        ...prev,
        projId: projIdFromURL,
      }));
    } 

  }, [projIdFromURL, projEstimateIdFromURL, setValues]);


};