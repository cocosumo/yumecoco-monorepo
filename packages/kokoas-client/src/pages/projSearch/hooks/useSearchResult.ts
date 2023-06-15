import { useAllContracts, useCustGroups, useCustomers, useProjects, useStores } from 'kokoas-client/src/hooksQuery';
import { useParseQuery } from './useParseQuery';
import { SearchResult } from '../types';
import { groupCustContacts } from '../helpers/groupCustContacts';
import { addressBuilder } from 'libs';
import { useStoreIds } from './useStoreIds';
import { useProjTypesIds } from './useProjTypesIds';
import parseISO from 'date-fns/parseISO';



export const useSearchResult =  () => {

  const parsedQuery = useParseQuery();

  const { data: recCustomers } = useCustomers();
  const { data: recCustGroup } = useCustGroups();
  const { data: recContracts } = useAllContracts();

  // クエリパラメーター
  const {
    keyword,
    custName,
    address,
    stores,
    projTypes,
    contractDateFrom,
    contractDateTo,
    completionDateFrom,
    completionDateTo,
    order,
    orderBy = 'storeSortNumber',
  } = parsedQuery || {};

  const { data: selectedStoreIds } = useStoreIds(stores ?? []);
  const { data: storeRec } = useStores();
  const { data: selectedProjTypeIds } = useProjTypesIds(projTypes ?? []);


  return useProjects<SearchResult[]>({ // 工事ベース
    enabled: !!parsedQuery && !!recCustomers && !!recContracts,
    select: (data) => {

      const unsortedResult =  data?.reduce((acc, curr) => {

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
          projTypeId,
          dataId,
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

        const {
          sortNumber,
        } = storeRec?.find(({ uuid }) => uuid.value === storeId.value) || {};


        const relCustomers = recCustomers?.filter(({ uuid }) => members?.value.some(({ value: { custId } }) => custId.value === uuid.value )) || [];

        const { 
          custEmails, 
          custTels, 
          addresses, 
          fullNames,
          fullNameReadings,
        } = groupCustContacts(relCustomers);

        /**　
         * 含めるかどうか判定。重くなったら、改修。
         * どうしても重いなら、サーバでキャッシュして処理する。
         * キャッシュの有効期限を設定しますが、
         * kintoneのwebhookで、更新されたら、キャッシュを削除するようにします。
         * 手間がかかるので、後回し。ras 20230611
        */

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
          dataId.value,
        ].join('').includes(keyword.trim());

        const isMatchedCustName = !custName || [...fullNames, ...fullNameReadings].join('').includes(custName);
        const isMatchAddress = !address || [...addresses, projAddress].join('').includes(address);
        const isMatchStore = !selectedStoreIds?.length || selectedStoreIds.includes(storeId.value);
        const isMatchProjType = !selectedProjTypeIds?.length || selectedProjTypeIds.includes(projTypeId.value);
        const isMatchcontractDateFrom = !contractDateFrom || (contractDateFrom && contractDate?.value && contractDateFrom <= parseISO(contractDate?.value));
        const isMatchcontractDateTo = !contractDateTo || (contractDateTo && contractDate?.value && contractDateTo >= parseISO(contractDate?.value));
        const isMatchcompletionDateFrom = !completionDateFrom || (completionDateFrom && finishDate?.value && completionDateFrom <= parseISO(finishDate?.value));
        const isMatchcompletionDateTo = !completionDateTo || (completionDateTo && finishDate?.value && completionDateTo >= parseISO(finishDate?.value));

        if (!parsedQuery
          || (isMatchedKeyword
            && isMatchedCustName
            && isMatchAddress
            && isMatchStore
            && isMatchProjType
            && isMatchcontractDateFrom
            && isMatchcontractDateTo
            && isMatchcompletionDateFrom
            && isMatchcompletionDateTo
          )
        ) {
          acc.push({
            custName: `${fullNames[0]}${fullNames.length > 1 ? `${fullNames.length - 1}` : ''}`,
            custNameKana: `${fullNameReadings[0]}`,
            custAddress: `${addresses[0]}`,
            tel: custTels[0],
            storeName: `${storeName.value}`,
            uuid: projId.value,
            projName: projName.value,
            contractDate: contractDate?.value ? contractDate.value : '-',
            projCompletedDate: finishDate?.value ? finishDate.value : '-',
            storeSortNumber: +(sortNumber?.value || 0),
          });
        }

        return acc;
      }, [] as SearchResult[]);

      return unsortedResult.sort((a, b) => {

        const parseOrderBy = orderBy as keyof SearchResult;

        switch (parseOrderBy) {
          case 'storeSortNumber':
            return order === 'asc' ? a[parseOrderBy] - b[parseOrderBy] : b[parseOrderBy] - a[parseOrderBy];
          case 'contractDate':
          case 'projCompletedDate':
            return order === 'asc' ? new Date(a[parseOrderBy]).getTime() - new Date(b[parseOrderBy]).getTime() : new Date(b[parseOrderBy]).getTime() - new Date(a[parseOrderBy]).getTime();
          default:
            return order === 'asc' ? a[parseOrderBy].localeCompare(b[parseOrderBy]) : b[parseOrderBy].localeCompare(a[parseOrderBy]);
        }
        
      });
    },
  });
};