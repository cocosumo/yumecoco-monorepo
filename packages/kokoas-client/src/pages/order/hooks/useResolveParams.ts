import { useEffect, useState } from 'react';
import { initialValues } from '../form';
import { useURLParamsV2 } from 'kokoas-client/src/hooks';
import { useOrderBudgetById, useProjById } from 'kokoas-client/src/hooksQuery';
import { convertOrderBudgetToForm } from '../api/convertOrderBudgetToForm';
import { TForm } from '../schema';

export const useResolveParams = () => {
  const {
    projId,
  } = useURLParamsV2();

  const [newFormVal, setNewFormVal] = useState<TForm>({
    ...initialValues,
    projId: projId || '',
  });

  const { 
    data: orderBudgetData, 
    isFetching: isFetchingOrderBudget, 
  } = useOrderBudgetById(projId || '');

  const {
    data: projData,
    isFetching: isFetchingProj,
  } = useProjById(projId || '');

  useEffect(() => {
    if (projData && orderBudgetData) {
      const newForm = convertOrderBudgetToForm({ project: projData, orderBudget: orderBudgetData });
      setNewFormVal(newForm);
    }
  }, [projData, orderBudgetData ]);

  return {
    newFormValues: newFormVal, 
    isFetching: isFetchingOrderBudget || isFetchingProj,
  };
};