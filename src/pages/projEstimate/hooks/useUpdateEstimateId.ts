import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { TypeOfForm } from '../form';


/**
 * 仮フックです、用更新 
 * PR#100マージされたらにグロバルフックあり。
 */



export const useUpdateEstimateId = () => {
  const { values: {
    estimateId,
  } } = useFormikContext<TypeOfForm>();
  useEffect(() => {


  }, [estimateId]);
};