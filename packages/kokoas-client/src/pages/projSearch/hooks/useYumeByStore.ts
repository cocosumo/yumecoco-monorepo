import { useEmployees, useStores } from 'kokoas-client/src/hooksQuery';
import { EmpAffiliations, EmpStatus, officerRoles } from 'types';
import { Option } from '../types';
import { useSelectStoresId } from './useSelectedStoresId';
import intersection from 'lodash/intersection';

interface GroupedByStore {
  [storeName: string]: {
    sortKey: number;
    options: Option[];
  }
}

export const useYumeByStore = (includeRetired = false) => {
  const selectedStoresId = useSelectStoresId();

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
    isActive: !includeRetired,
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
          const isStoresInstersect = intersectedStores.length > 0;

          if (selectedStoresId.length && !isStoresInstersect ) return acc;
          if ((affiliation.value as EmpAffiliations) !== 'ゆめてつ') return acc;
          if (!officerRoles.includes(role.value)) return acc;

          const storeNameRec = storeData?.find(({ storeId }) => storeId === mainStoreId.value);

          const {
            storeName =  mainStoreName.value ?? '未設定',
            sortNumber = 0,
          } = storeNameRec ?? {};

          const resolvedStore = storeName;

          if (!acc[resolvedStore]?.options) {
            acc[resolvedStore] = {
              options: [],
              sortKey: +(sortNumber || 0),
            };
          }


          acc[resolvedStore].options.push({
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