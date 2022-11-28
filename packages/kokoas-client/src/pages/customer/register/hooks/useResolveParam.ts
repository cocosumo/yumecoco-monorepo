import { useState, useEffect, useMemo } from 'react';
import { initialValues, TypeOfForm } from '../form';
import { getParam } from 'kokoas-client/src/helpers/url';
import { useCustGroupById, useCustomersByIds } from 'kokoas-client/src/hooksQuery';
import { convertToForm } from '../helper/convertToForm';
import { useBackdrop } from 'kokoas-client/src/hooks';
import { useIsFetching } from '@tanstack/react-query';

export const useResolveParam = () => {
  const { setBackdropState } = useBackdrop();
  const isFetching = useIsFetching();
  const [initialState, setInitialState] = useState<TypeOfForm>(initialValues);
  const custGroupId = getParam('custGroupId') ?? '';
  const passedProjId = getParam('projId');

  const { data: recCustGroup } = useCustGroupById(custGroupId);

  const custIds = useMemo(
    () => recCustGroup?.members.value.map((m) => m.value.custId.value),
    [recCustGroup],
  );

  const { data: recsCustomers } = useCustomersByIds(custIds);

  useEffect(() => {

    if (recCustGroup && recsCustomers) {
      const newForm = convertToForm(recCustGroup, recsCustomers);
      setInitialState(newForm);
    }

    if (!custGroupId) setInitialState(initialValues);

  }, [recCustGroup, recsCustomers, custGroupId]);

  useEffect(() => {
    setBackdropState({ open: !!isFetching });
  }, [isFetching, setBackdropState]);

  return {
    initialState,
    custGroupId,
    passedProjId,
  };
};