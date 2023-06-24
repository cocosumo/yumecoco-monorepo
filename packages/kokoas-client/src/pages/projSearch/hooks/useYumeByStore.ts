import { useEmployees, useStores } from 'kokoas-client/src/hooksQuery';
import { EmpAffiliations, EmpStatus, officerRoles } from 'types';
import { Option } from '../types';
import { useSelectStoresId } from './useSelectedStoresId';
import intersection from 'lodash/intersection';
import { useWatch } from 'react-hook-form';

interface GroupedByStore {
  [storeName: string]: {
    sortKey: number;
    options: Option[];
  }
}

export const useYumeByStore = () => {
  const { data: selectedStoresId } = useSelectStoresId();
  const includeRetired = useWatch({ name: 'includeRetired' }) as boolean;

  const { data: storeData } = useStores((d) => d
    .map(({ 
      uuid, 
      storeNameShort, 
      sortNumber,
    })=>({ 
      storeId: uuid.value, 
      storeName: storeNameShort.value,
      sortNumber: +(sortNumber.value || 0),
    })));

  return useEmployees({
    isActiveOnly: !includeRetired,
    enabled: !!storeData,
    select: (d) => {
      const groupedData = d.reduce(
        (acc, cur) => {
          const {
            affiliation,
            文字列＿氏名: name,
            状態: empStatus,
            uuid,
            役職: role,
            sort,
            mainStoreId_v2: mainStoreId,
            mainStore_v2: mainStoreName,
            affStores,
          } = cur;

          const affStoresId = affStores.value.map(({ value: { affStoreId } }) => affStoreId.value);
          const intersectedStores = intersection([...affStoresId, mainStoreId.value], selectedStoresId);

          // Ignore if selectedStoresId is not empty and no intersection
          if (selectedStoresId?.length && !intersectedStores.length ) return acc;

          // Ignore if affiliation is not ゆめてつ
          if ((affiliation.value as EmpAffiliations) !== 'ゆめてつ') return acc;

          // Ignore if role is not one of officerRoles
          if (!officerRoles.includes(role.value)) return acc;

          const storeNameRec = storeData?.find(({ storeId }) => storeId === mainStoreId.value);

          const {
            storeName =  mainStoreName.value ?? '未設定',
            sortNumber = 0,
          } = storeNameRec ?? {};

          const resolvedStoreName = storeName;

          if (!acc[resolvedStoreName]?.options) {
            acc[resolvedStoreName] = {
              options: [],
              sortKey: +(sortNumber || 0),
            };
          }


          acc[resolvedStoreName].options.push({
            label: name.value,
            value: uuid.value,
            isRetired: (empStatus.value as EmpStatus) !== '有効',
            sortKey: +(sort.value || 0),
          });
          
          return acc;
        }, 
        Object.create(null) as GroupedByStore,
      );

      return Object.entries(groupedData).sort((a, b) => b[1].sortKey - a[1].sortKey);
    },
  });

};