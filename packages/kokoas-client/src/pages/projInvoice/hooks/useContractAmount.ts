import { useFormikContext } from 'formik';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from '../form';


export const useContractAmount = (
  projId: string,
) => {
  const { values } = useFormikContext<TypeOfForm>();
  const { estimates } = values;

  const {
    data,
  } = useEstimatesByProjId(projId);

  const {
    calculated,
    records,
  } = data || {};


  return records?.reduce((acc, cur, idx) => {
    // 未契約の見積もり or 除外する場合
    if (!cur.envStatus.value || (estimates?.[idx].isForPayment ?? true)) return acc;

    /* 既に入金済みの金額は差し引く */
    return acc + (calculated?.[idx].totalAmountInclTax ?? 0);
  }, 0);
};