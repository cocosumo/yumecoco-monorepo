/* eslint-disable no-case-declarations */
import { useAllContracts, useCustGroups, useCustomers, useProjects, useStores } from 'kokoas-client/src/hooksQuery';
import { useParseQuery } from './useParseQuery';
import { SearchResult } from '../types';
import { groupCustContacts } from '../helpers/groupCustContacts';
import { addressBuilder, formatDataId } from 'libs';
import { useStoreIds } from './useStoreIds';
import { useProjTypesIds } from './useProjTypesIds';
import parseISO from 'date-fns/parseISO';
import { getAgentsByType as getProjAgentsByType } from 'api-kintone/src/projects/helpers/getAgentsByType';
import { getAgentsByType } from 'api-kintone/src/custgroups/helpers/getAgentsByType';
import intersection from 'lodash/intersection';
import { parseISOTimeToFormat } from 'kokoas-client/src/lib';



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
    cocoAG,
    yumeAG,
    contractDateFrom,
    contractDateTo,
    completionDateFrom,
    completionDateTo,
    order,
    orderBy = 'storeSortNumber',
    includeDeleted,
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
          uuid: projId,
          projName,
          projTypeId,
          dataId,
          agents: projAgents,
          cancelStatus: projCancelStatus,
          作成日時: createdAt,
          更新日時: updatedAt,
        } = curr; // 工事情報;

        const isProjectDeleted = projCancelStatus.value !== ''; // 削除、中止などあり
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
          agents,
          isDeleted,
        } = custGroup;

        const isCustGroupDeleted = isDeleted.value === '1';

        const cocoAGs = getAgentsByType(agents, 'cocoAG');
        const cocoAGNames = cocoAGs.map(({ value: { employeeName } }) => employeeName.value);
        const cocoAGIds = cocoAGs.map(({ value: { employeeId } }) => employeeId.value);

        const yumeAGs = getAgentsByType(agents, 'yumeAG');
        const yumeAGNames = yumeAGs.map(({ value: { employeeName } }) => employeeName.value);
        const yumeAGIds = yumeAGs.map(({ value: { employeeId } }) => employeeId.value);

        const cocoConst = getProjAgentsByType(projAgents, 'cocoConst');
        const cocoConstNames = cocoConst.map(({ value: { agentName } }) => agentName.value);
        const cocoConstIds = cocoConst.map(({ value: { agentId } }) => agentId.value);

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
          ...yumeAGNames,
          ...cocoAGNames,
          ...cocoConstNames,
          storeName.value,
          projAddress,
          dataId.value,
        ].join('').includes(keyword.trim());

        /*     cocoAG?.some((ag) => {
          console.log(ag, cocoNames, cocoNames.includes(ag) );
          return cocoNames.includes(ag);
        });  */

        // console.log('cocoNames', cocoAG, cocoNames, cocoAG?.some((ag) => cocoNames.includes(ag)) );

        const isMatchedCustName = !custName || [...fullNames, ...fullNameReadings].join('').includes(custName);
        const isMatchAddress = !address || [...addresses, projAddress].join('').includes(address);
        const isMatchStore = !selectedStoreIds?.length || selectedStoreIds.includes(storeId.value);
        const isMatchProjType = !selectedProjTypeIds?.length || selectedProjTypeIds.includes(projTypeId.value);
        const isMatchCocoNames = !cocoAG?.length || !!intersection(cocoAG, [...cocoAGIds, ...cocoConstIds]).length;
        const isMatchYumeNames = !yumeAG?.length || !!intersection(yumeAG, yumeAGIds).length;
        const isMatchcontractDateFrom = !contractDateFrom || (contractDateFrom && contractDate?.value && contractDateFrom <= parseISO(contractDate?.value));
        const isMatchcontractDateTo = !contractDateTo || (contractDateTo && contractDate?.value && contractDateTo >= parseISO(contractDate?.value));
        const isMatchcompletionDateFrom = !completionDateFrom || (completionDateFrom && finishDate?.value && completionDateFrom <= parseISO(finishDate?.value));
        const isMatchcompletionDateTo = !completionDateTo || (completionDateTo && finishDate?.value && completionDateTo >= parseISO(finishDate?.value));
        const isIncludeDeleted = includeDeleted ? (isProjectDeleted || isCustGroupDeleted) : !(isProjectDeleted || isCustGroupDeleted);

        if (!parsedQuery
          || (isMatchedKeyword
            && isMatchedCustName
            && isMatchAddress
            && isMatchStore
            && isMatchProjType
            && isMatchCocoNames
            && isMatchYumeNames
            && isMatchcontractDateFrom
            && isMatchcontractDateTo
            && isMatchcompletionDateFrom
            && isMatchcompletionDateTo
            && isIncludeDeleted
          )
        ) {
          acc.push({
            projDataId: formatDataId(dataId.value),
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
            createdAt: parseISOTimeToFormat(createdAt.value, 'yyyy-MM-dd HH:mm'),
            updatedAt: parseISOTimeToFormat(updatedAt.value, 'yyyy-MM-dd HH:mm'), 
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

            // put "-" or undefined at the bottom of the result
            if (a[parseOrderBy] === '-' || !a[parseOrderBy]) return 1;
            if (b[parseOrderBy] === '-' || !b[parseOrderBy]) return -1;

            return order === 'asc' ? new Date(a[parseOrderBy]).getTime() - new Date(b[parseOrderBy]).getTime() : new Date(b[parseOrderBy]).getTime() - new Date(a[parseOrderBy]).getTime();
          default:
            const valueA = a[parseOrderBy] || ''; 
            const valueB = b[parseOrderBy] || ''; 
            return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
      });
    },
  });
};