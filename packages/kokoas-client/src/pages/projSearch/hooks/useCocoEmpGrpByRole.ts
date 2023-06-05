import { useEmployees } from 'kokoas-client/src/hooksQuery';
import { EmpAffiliations, EmpStatus } from 'types';


export type Option = {
  label: string,
  value: string,
  isRetired: boolean,
};

type GroupedEmployees = {
  [key: string]: Option[]
};

export const useCocoEmpGrpByRole = (includeRetired = false) => {
  return useEmployees({
    isActive: !includeRetired,
    select: (d) => {
      return d.reduce(
        (acc, cur) => {
          const {
            affiliation,
            役職: role,
            文字列＿氏名: name,
            状態: empStatus,
            uuid,
          } = cur;

          if ((affiliation.value as EmpAffiliations) !== 'ここすも') return acc;

          if (!acc[role.value]) acc[role.value] = [];

          acc[role.value].push({
            label: name.value,
            value: uuid.value,
            isRetired: (empStatus.value as EmpStatus) !== '有効',
          });
          return acc;
        }, 
        Object.create(null) as GroupedEmployees,
      );
    },
  });

};