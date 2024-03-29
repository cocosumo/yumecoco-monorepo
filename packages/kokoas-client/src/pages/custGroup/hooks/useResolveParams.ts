import { NavigateWithQueryProps, useURLParamsV2 } from 'kokoas-client/src/hooks';
import { initialValues } from '../form';
import { useCustGroupById, useCustomersByIds } from 'kokoas-client/src/hooksQuery';
import { useEffect, useMemo, useState } from 'react';
import { convertToForm } from '../api/convertToForm';

export const useResolveParams = () => {
  const [formValues, setFormValues] = useState(initialValues);

  const {
    custGroupId,
    isNew,
  } = useURLParamsV2<NavigateWithQueryProps>();
  
  const { data: recCustGroup } = useCustGroupById(custGroupId || '');

  const custIds = useMemo(
    () => recCustGroup?.members.value.map((m) => m.value.custId.value),
    [recCustGroup],
  );

  const { data: recsCustomers } = useCustomersByIds(custIds);

  useEffect(() => {

    if (recCustGroup && recsCustomers) {

      const newForm = convertToForm(recCustGroup, recsCustomers, !!isNew);
      setFormValues(newForm);
    } else if (!custGroupId ) {
      setFormValues(initialValues);
    }

  }, [recCustGroup, recsCustomers, custGroupId, isNew]);

  


  return formValues;
};