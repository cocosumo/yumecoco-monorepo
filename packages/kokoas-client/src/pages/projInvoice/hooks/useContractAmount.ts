import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useMemo } from 'react';
import { TypeOfForm } from '../form';


export const useContractAmount = (
) => {
  const { values, setValues } = useFormikContext<TypeOfForm>();
  const { estimates } = values;

  const contractAmount = useMemo(() => estimates?.reduce((acc, cur) => {

    if (cur.isForPayment) return acc;

    return acc + +cur.contractAmount;

  }, 0), [estimates]);



  setValues(produce((draft) => {
    draft.contractAmount = String(Math.round(contractAmount ?? 0));
  }));

  return {
    contractAmount: Math.round(contractAmount ?? 0),
  };
};