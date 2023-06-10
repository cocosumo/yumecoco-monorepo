import { useEmployees } from 'kokoas-client/src/hooksQuery';
import { EmpAffiliations, EmpStatus } from 'types';


export type Option = {
  label: string,
  value: string,
  isRetired: boolean,
  sortKey: number,
};

type GroupedEmployees = {
  [key: string]: Option[]
};

const inludeRoles = [
  '取締役',
  '店長',
  '店長代理',
  '主任',
  '営業',
  '工務',
  '経理',
];

export const useCocoEmpGrpByArea = (includeRetired = false) => {

  return useEmployees({
    isActive: !includeRetired,
    select: (d) => {
      return d.reduce(
        (acc, cur) => {
          const {
            affiliation,
            文字列＿氏名: name,
            状態: empStatus,
            uuid,
            territory_v2: territory,
            役職: role,
            sort,
          } = cur;

          if ((affiliation.value as EmpAffiliations) !== 'ここすも') return acc;
          if (!inludeRoles.includes(role.value)) return acc;
          
          const resolvedTerritory = territory.value ?? '未設定';

          if (!acc[resolvedTerritory]) acc[resolvedTerritory] = [];

          acc[resolvedTerritory].push({
            label: name.value,
            value: uuid.value,
            isRetired: (empStatus.value as EmpStatus) !== '有効',
            sortKey: +(sort.value || 0),
          });
          return acc;
        }, 
        Object.create(null) as GroupedEmployees,
      );
    },
  });

};