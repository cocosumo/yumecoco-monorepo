import { useAllContracts, useCustGroups, useCustomers, useProjects } from 'kokoas-client/src/hooksQuery';
import { useParseQuery } from './useParseQuery';
import { SearchResult } from '../types';
import { groupCustContacts } from '../helpers/groupCustContacts';
import { addressBuilder } from 'libs';
import { useStoreIds } from './useStoreIds';
//import { search } from '../api/search'; 

// fakerは膨大なデータを生成するので、一旦コメントアウト

export const useSearchResult =  () => {

  const parsedQuery = useParseQuery();

  const { data: recCustomers } = useCustomers();
  const { data: recCustGroup } = useCustGroups();
  const { data: recContracts } = useAllContracts();

  const {
    keyword,
    custName,
    address,
    stores,
  } = parsedQuery || {};

  const selectedStoreIds = useStoreIds(stores ?? []);

  console.log('selectedStoreIds', selectedStoreIds);

  return useProjects<SearchResult[]>({
    enabled: !!parsedQuery && !!recCustomers && !!recContracts,
    select: (data) => {

      return data?.reduce((acc, curr) => {

        const {
          custGroupId,
          postal,
          address1,
          address2,
          yumeAGNames,
          cocoAGNames,
          cocoConstNames,
          uuid: projId,
          projName,
        } = curr; // 工事情報;

        const projAddress = addressBuilder({
          postal: postal.value,
          address1: address1.value,
          address2: address2.value,
        });
        
        if (!custGroupId) return acc;

        const custGroup = recCustGroup?.find(({ uuid }) => uuid.value === custGroupId.value);
        if (!custGroup) return acc;

        const contracts = recContracts?.filter(({ projId: _prodId }) => projId.value === _prodId.value);
        const firstContract = contracts?.[0];

        const {
          contractDate,
          finishDate,
        } = firstContract || {};

        const {
          members,
          storeName,
          storeId,
        } = custGroup;

        console.log('storeId', selectedStoreIds, storeId?.value);

        const relCustomers = recCustomers?.filter(({ uuid }) => members?.value.some(({ value: { custId } }) => custId.value === uuid.value )) || [];
        const { 
          custEmails, 
          custTels, 
          addresses, 
          fullNames,
          fullNameReadings,
        } = groupCustContacts(relCustomers);

        const isMatchedKeyword = !keyword || [
          ...fullNames,
          ...fullNameReadings,
          ...custEmails,
          ...custTels,
          ...addresses,
          yumeAGNames.value,
          cocoAGNames.value,
          cocoConstNames.value,
          storeName.value,
          projAddress,
        ].join('').includes(keyword);

        const isMatchedCustName = !custName || [...fullNames, ...fullNameReadings].join('').includes(custName);
        const isMatchAddress = !address || [...addresses, projAddress].join('').includes(address);
        const isMatchStore = !selectedStoreIds.length || selectedStoreIds.includes(storeId.value);

        if (!parsedQuery
          || (isMatchedKeyword
            && isMatchedCustName
            && isMatchAddress
            && isMatchStore
          )
        ) {
          acc.push({
            custName: `${fullNames[0]}${fullNames.length > 1 ? `${fullNames.length - 1}` : ''}`,
            custNameKana: `${fullNameReadings[0]}`,
            custAddress: `${addresses[0]}`,
            tel: `${custTels.join('、')}`,
            storeName: `${storeName.value}`,
            uuid: projId.value,
            projName: projName.value,
            contractDate: contractDate?.value ? contractDate.value : '-',
            projCompletedDate: finishDate?.value ? finishDate.value : '-',
          });
        }

        return acc;
      }, [] as SearchResult[]);
    },
  });
};