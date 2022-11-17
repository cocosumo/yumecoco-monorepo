import { useFormikContext } from 'formik';
import { useContractsByProjId } from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from '../form';


export const useContractAmount = (
  projId: string,
) => {
  const { values } = useFormikContext<TypeOfForm>();
  const { estimates } = values;

  const {
    data,
    isFetching,
  } = useContractsByProjId(projId);

  const { calculated } = data || {};

  if (isFetching) return 0;


  const totalAmount = calculated?.reduce((acc, cur, idx) => {

    if (estimates?.[idx].isForPayment ?? true) return acc;

    return acc + cur.totalAmountInclTax;
  }, 0);

  /* 既に入金済みの金額は差し引く */

  return totalAmount;
};