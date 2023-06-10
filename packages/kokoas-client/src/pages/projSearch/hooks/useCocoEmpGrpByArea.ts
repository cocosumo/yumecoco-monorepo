import { useEmployees } from 'kokoas-client/src/hooksQuery';
import { EmpAffiliations, EmpStatus, officerRoles  } from 'types';
import { GroupedEmployees } from '../types';
import { useSelectStoresId } from './useSelectedStoresId';
import { useWatch } from 'react-hook-form';

export const useCocoEmpGrpByArea = () => {

  const { data: selectedStoresId } = useSelectStoresId();
  const includeRetired = useWatch({ name: 'includeRetired' }) as boolean;


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
            mainStoreId_v2: mainStoreId,
          } = cur;

          if (selectedStoresId?.length && !selectedStoresId.includes(mainStoreId.value)) return acc;
          if ((affiliation.value as EmpAffiliations) !== 'ここすも') return acc;
          if (!officerRoles.includes(role.value)) return acc;

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