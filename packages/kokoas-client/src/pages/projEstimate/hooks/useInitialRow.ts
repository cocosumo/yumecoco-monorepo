import { useFormikContext } from 'formik';
import { useMemo } from 'react';
import { initialValues, TypeOfForm } from '../form';

export const useInitialRow = () => {
  const {
    values : { projTypeProfit },
  } = useFormikContext<TypeOfForm>();

  return useMemo(() => {
    return {
      ...initialValues.items[0],
      elemProfRate: projTypeProfit,
    };
  }, [projTypeProfit]);


};