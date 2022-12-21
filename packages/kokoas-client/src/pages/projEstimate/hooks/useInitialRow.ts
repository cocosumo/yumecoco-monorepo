import { useFormikContext } from 'formik';
import { useCallback, useMemo } from 'react';
import { initialValues, TypeOfForm } from '../form';
import { v4 as uuidV4 } from 'uuid';

export const useInitialRow = () => {
  const {
    values : { projTypeProfit },
  } = useFormikContext<TypeOfForm>();

  const initialRow = useMemo(() => {
    return {
      ...initialValues.items[0],
      elemProfRate: projTypeProfit,
    };
  }, [projTypeProfit]);

  const getNewRow = useCallback(() : TypeOfForm['items'][number] => {
    return ({
      ...initialRow,
      key: uuidV4(),
    });
  }, [initialRow]);

  return {
    initialRow,
    getNewRow,
  };

};