import { useAllEmployees } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';
import { EmpStatus } from 'types';

export type Option = {
  empId: string;
  empName: string;
  sortNumber: number;
  affiliation: string;
  isResigned: boolean;
};

export const useOptions = ({
  includeResigned,
  keyword,
  selectedAffiliation,
}:{
  includeResigned: boolean,
  keyword: string,
  selectedAffiliation: string[],
}) => {
  const { data } = useAllEmployees();

  return useMemo(() => {

    if (!data) return [];

    return data
      .reduce(
        (acc, cur) => {
          const {
            uuid: empId,
            文字列＿氏名: empName,
            氏名ふりがな: empNameKana,
            氏名ローマ字: empNameRomaji,
            sort: sortNumber,
            状態: status,
            affiliation: affiliation,
          } = cur;

          if (!includeResigned && (status.value as EmpStatus) !==  '有効') {
            return acc;
          }

          const keywordMatch = (empName.value + empNameKana.value + empNameRomaji.value.toLocaleUpperCase())
            .includes(keyword.toLocaleUpperCase());

          if (keyword && !keywordMatch) {
            return acc;
          }

          if (selectedAffiliation.length && !selectedAffiliation.includes(affiliation.value)) {
            return acc;
          }

          acc.push({
            empId: empId.value,
            empName: `${empName.value}`,
            sortNumber: +sortNumber.value,
            isResigned: (status.value as EmpStatus) !==  '有効',
            affiliation: affiliation.value,
          });
        
          return acc;
        }, 
        [] as Option[],
      ).sort((a, b) => {
        // sortNumber that is zero should be at the bottom
        // sortNumber by descending order
        if (a.sortNumber === 0) return 1;
        if (b.sortNumber === 0) return -1;
        return b.sortNumber - a.sortNumber;
        
      });
 
  }, [
    data, 
    includeResigned,
    keyword,
    selectedAffiliation,
  ]);
};