import { useEmployees } from 'kokoas-client/src/hooksQuery';
import { EmpAffiliations } from 'types';


export type Option = {
  label: string,
  value: string,
};

type GroupedEmployees = {
  [key: string]: Option[]
};

export const useCocoEmpGrpByRole = () => {
  return useEmployees({
    select: (d) => {
      return d.reduce(
        (acc, cur) => {
          const {
            affiliation,
            役職: role,
            文字列＿氏名: name,
            uuid,
          } = cur;

          if ((affiliation.value as EmpAffiliations) !== 'ここすも') return acc;

          if (!acc[role.value]) acc[role.value] = [];

          acc[role.value].push({
            label: name.value,
            value: uuid.value,
          });
          return acc;
        }, 
        Object.create(null) as GroupedEmployees,
      );
    },
  });

};