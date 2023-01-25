import { useState, useEffect, useMemo } from 'react';
import { initialValues, TypeOfForm } from '../form';
import { useCustGroupById, useCustomersByIds } from 'kokoas-client/src/hooksQuery';
import { convertToForm } from '../helper/convertToForm';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';

export const useResolveParam = () => {
  const [initialState, setInitialState] = useState<TypeOfForm>(initialValues);
  const {
    custGroupId,
    projId: passedProjId,
  } = useURLParams();


  const { data: recCustGroup } = useCustGroupById(custGroupId || '');

  const custIds = useMemo(
    () => recCustGroup?.members.value.map((m) => m.value.custId.value),
    [recCustGroup],
  );

  const { data: recsCustomers } = useCustomersByIds(custIds);

  useEffect(() => {

    if (recCustGroup && recsCustomers) {
      const newForm = convertToForm(recCustGroup, recsCustomers);
      setInitialState(newForm);
    } else if (!custGroupId ) {
      setInitialState(initialValues);
    }

  }, [recCustGroup, recsCustomers, custGroupId]);

  return {
    initialState,
    custGroupId,
    passedProjId,
  };
};