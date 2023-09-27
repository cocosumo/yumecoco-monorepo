import { useQuery } from "@tanstack/react-query";
import { getMonthRange } from "../../../../helpers/getMonthRange";
import { useTypedWatch } from "./useTypedRHF";

/**
 * 来月見込み
 * * 次月と見込み案件の「契約予定日」の月と一緒、もしくは「契約予定日」が空。
 * * 引っ張るのは「契約予定金額」
 * 
 * 情報元はココアスの「工事内容」
 */
export const useProspectsNextMonth = () => {
  const [
    year,
    month,
  ] = useTypedWatch({
    name: [
      'year',
      'month',
    ],
  });

  const {
    minDateStr,
    maxDateteStr,
  } = getMonthRange(year, month);

  const condition = [

  ]

  return useQuery(
    ['prospectsNextMonth', condition],
    () => getAllProjects({
      condition,
    }),
  );
};