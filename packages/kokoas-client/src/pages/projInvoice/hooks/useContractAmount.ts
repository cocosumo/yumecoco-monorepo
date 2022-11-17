import { useFormikContext } from 'formik';
import { useContractsByProjId } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';
import { TypeOfForm } from '../form';


export const useContractAmount = (
  projId: string,
) => {
  const { values } = useFormikContext<TypeOfForm>();
  const { estimates } = values;

  const {
    data,
  } = useContractsByProjId(projId);

  const { calculated } = data || {};


  const totalAmount = useMemo(() => calculated?.reduce((acc, cur, idx) => {

    if (estimates?.[idx]?.isForPayment) return acc;

    return acc + cur.totalAmountInclTax;

  }, 0), [calculated, estimates]);

  /* 既に入金済みの金額は差し引く */

  return totalAmount;
};