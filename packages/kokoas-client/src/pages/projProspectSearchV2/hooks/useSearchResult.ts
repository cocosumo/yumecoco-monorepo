/* eslint-disable no-case-declarations */
import { useAllContracts, useCustGroups, useCustomers, useProjects, useStores } from 'kokoas-client/src/hooksQuery';
import { useParseQuery } from './useParseQuery';
import { ISearchResult, KSearchResult } from '../types';
import { groupCustContacts } from '../helpers/groupCustContacts';
import { addressBuilder, formatDataId } from 'libs';
import parseISO from 'date-fns/parseISO';
import { getAgentsByType as getProjAgentsByType } from 'api-kintone/src/projects/helpers/getAgentsByType';
import { getAgentsByType } from 'api-kintone/src/custgroups/helpers/getAgentsByType';

import format from 'date-fns/format';
import { matchCocoAgentsById } from '../helpers/matchCocoAgentsById';
import { useCallback } from 'react';



export const useSearchResult =  () => {

  const parsedQuery = useParseQuery();

  const { data: recCustomers } = useCustomers();
  const { data: recCustGroup } = useCustGroups();
  const { data: recContracts } = useAllContracts();

  // Alias parsedQuery to q for brevity, and to avoid collision with the record variables
  const q = parsedQuery;

  //const { data: selectedStoreIds } = useStoreIds(stores ?? []);
  const { data: storeRec } = useStores();  

  return useProjects<ISearchResult[]>({ // 工事ベース
    enabled: !!parsedQuery && !!recCustomers?.length && !!recContracts?.length && !!recCustGroup?.length && !!storeRec?.length,
    select: useCallback((data) => {
      console.log('FIRE!');
      const unsortedResult =  data?.reduce((acc, curr) => {

        const {
          uuid: projId,
          projName,
          rank,
          custGroupId,

          dataId,
          agents: projAgents,
          cancelStatus: projCancelStatus,
          作成日時: createDate,
          更新日時: updateDate,
          
          estatePurchaseDate,
          planApplicationDate,
          schedContractDate,
          
          schedContractPrice: schedContractAmt,

          memo,

          postal,
          address1,
          address2,

          finalPostal,
          finalAddress1,
          finalAddress2,
        } = curr; // 工事情報;

        const projAddress = addressBuilder({
          postal: postal.value,
          address1: address1.value,
          address2: address2.value,
        });

        const projAddressConfirmed = addressBuilder({
          postal: finalPostal.value,
          address1: finalAddress1.value,
          address2: finalAddress2.value,
        });


        const isProjectDeleted = projCancelStatus.value !== ''; 

        // 削除、中止など、除外
        if (isProjectDeleted) return acc;

        // 顧客情報がなかったら、除外
        if (!custGroupId) return acc;

        const custGroup = recCustGroup?.find(({ uuid }) => uuid.value === custGroupId.value);
        if (!custGroup) return acc;



        const {
          members,
          storeName,
          storeId,
          agents,
          isDeleted,
        } = custGroup;

        const isCustGroupDeleted = isDeleted.value === '1';
        // 顧客グループが削除されていたら、除外
        if (isCustGroupDeleted) return acc;

        
        const hasContract = recContracts
          ?.some(
            ({ 
              projId: _prodId, 
              contractType, 
            }) => projId.value === _prodId.value 
            && contractType.value !== '設計契約', // 契約として扱いしない　K229, 
          );


        // 契約があったら、除外
        if (hasContract) return acc; 
        

        const cocoAGs = getAgentsByType(agents, 'cocoAG');
        const cocoAGNames = cocoAGs.map(({ value: { employeeName } }) => employeeName.value);
        //const cocoAGIds = cocoAGs.map(({ value: { employeeId } }) => employeeId.value);

        const yumeAGs = getAgentsByType(agents, 'yumeAG');
        const yumeAGNames = yumeAGs.map(({ value: { employeeName } }) => employeeName.value);
        //const yumeAGIds = yumeAGs.map(({ value: { employeeId } }) => employeeId.value);

        const cocoConst = getProjAgentsByType(projAgents, 'cocoConst');
        const cocoConstNames = cocoConst.map(({ value: { agentName } }) => agentName.value);
        //const cocoConstIds = cocoConst.map(({ value: { agentId } }) => agentId.value);

        const {
          sortNumber,
        } = storeRec?.find(({ uuid }) => uuid.value === storeId.value) || {};


        const relCustomers = recCustomers?.filter(({ uuid }) => members?.value.some(({ value: { custId } }) => custId.value === uuid.value )) || [];

        const {  
          fullNames,
          fullNameReadings,
          custTels,
          addresses,

        } = groupCustContacts(relCustomers);

        /**　
         * 含めるかどうか判定。重くなったら、改修。
         * どうしても重いなら、サーバでキャッシュして処理する。
         * キャッシュの有効期限を設定しますが、
         * kintoneのwebhookで、更新されたら、キャッシュを削除するようにします。
         * 手間がかかるので、後回し。ras 20230611
        */

        // フォームの契約金額は、万円単位なので、10000倍する
        const parsedQueryContractAmtFrom = q.contractAmtFrom ? +q.contractAmtFrom * 10000 : 0;
        const parsedQueryContractAmtTo = q.contractAmtTo ? +q.contractAmtTo * 10000 : 0;

        const parsedContractAmt = +schedContractAmt.value;

        const isRankMatch = !q.ranks?.length || q.ranks?.includes(rank.value);
        const isMatchCustname = !q.custName || fullNames
          .concat(fullNameReadings).join('')
          .includes(q.custName.trim());
        const isMatchProjName = !q.projName || projName.value.includes(q.projName.trim());
        const isMatchContractAmtFrom = !q.contractAmtFrom || (q.contractAmtFrom && parsedContractAmt >= parsedQueryContractAmtFrom);
        const isMatchContractAmtTo = !q.contractAmtTo || (q.contractAmtTo && parsedContractAmt <= parsedQueryContractAmtTo);
        const isMatchContractDateFrom = !q.contractDateFrom || (q.contractDateFrom && schedContractDate?.value && parseISO(q.contractDateFrom as string) <= parseISO(schedContractDate?.value));
        const isMatchContractDateTo = !q.contractDateTo || (q.contractDateTo && schedContractDate?.value && parseISO(q.contractDateTo as string) >= parseISO(schedContractDate?.value));
        const isMatchMemo = !q.memo || (q.memo && projName.value.includes(q.memo.trim()));

        const matchedCocoAG = matchCocoAgentsById({
          empIdToMatch: q.cocoAGId,
          projAgents,
          custAgents: agents,
        });
        const isMatchedCocoAGId = !q.cocoAGId || !!matchedCocoAG;

        //console.log(isMatchContractDateFrom, q.contractDateFrom, schedContractDate?.value);

        const isMatchKeyword = !q.keyword || [
          ...fullNames,
          ...cocoAGNames,
          ...yumeAGNames,
          ...cocoConstNames,
          storeName.value,
          projName.value,
          projId.value,
          custGroupId.value,
          memo.value,
          formatDataId(dataId.value),
        ].join('').includes(q.keyword.trim());
        

        if (!q || 
          (
            isMatchKeyword
          && isRankMatch
          && isMatchCustname
          && isMatchProjName
          && isMatchContractAmtFrom
          && isMatchContractAmtTo
          && isMatchContractDateFrom
          && isMatchContractDateTo
          && isMatchMemo
          && isMatchedCocoAGId
          )
        ) {
          acc.push({
            rank: rank.value,
            storeSortNumber: +(sortNumber?.value || 0),
            custNames: fullNames.join(','),
            cocoAG: cocoAGNames.join(',') || '-',
            yumeAG: yumeAGNames.join(',') || '-',
            cocoConst: cocoConstNames.join(',') || '-',
            projId: projId.value,
            projDataId: formatDataId(dataId.value),
            estatePurchaseDate: estatePurchaseDate?.value ? estatePurchaseDate.value : '-',
            planApplicationDate: planApplicationDate?.value ? planApplicationDate.value : '-',
            projName: projName.value,
            storeName: storeName.value,
            schedContractAmt: +schedContractAmt.value,
            schedContractDate: schedContractDate?.value ? schedContractDate.value : '-',
            createDate: format(parseISO(createDate.value), 'yyyy-MM-dd HH:mm'),
            updateDate: format(parseISO(updateDate.value), 'yyyy-MM-dd HH:mm'),

            tel: custTels?.[0] || '-',
            custAddress: addresses?.[0] || '-',
            projAddress: projAddress,
            projAddressConfirmed: projAddressConfirmed,
            

          });
        }
       

        return acc;
      }, [] as ISearchResult[]);

      //return unsortedResult;


      return unsortedResult.sort((a, b) => {
        const parseOrderBy = q.orderBy as KSearchResult;


        switch (parseOrderBy) {
          case 'storeSortNumber':
            return q.order === 'asc' ? a[parseOrderBy] - b[parseOrderBy] : b[parseOrderBy] - a[parseOrderBy];
          case 'updateDate':
          case 'createDate':
            const dateA = parseISO(a[parseOrderBy]);
            const dateB = parseISO(b[parseOrderBy]);
            return q.order === 'asc' 
              ? dateA.getTime() - dateB.getTime()
              : dateB.getTime() - dateA.getTime();
          case 'rank': 
            // rank is string, but empty string should be treated as the lowest rank
            // if rank = '設計契約' should be the highest rank
        
            const rankA = a[parseOrderBy] || 'Z';
            const rankB = b[parseOrderBy] || 'Z';
            
            if (rankA === '設計契約' || rankB === '設計契約') {
              // multiply the result by 1 or -1 based on the order.
              return (rankA === '設計契約' ? -1 : 1) * (q.order === 'asc' ? 1 : -1);
            }
            

            return q.order === 'asc'
              ? rankA.localeCompare(rankB)
              : rankB.localeCompare(rankA);
            
          default:
            return 0;
        }
        
      }); 
    }, 
    [
      q, 
      recCustomers, 
      recCustGroup, 
      recContracts, 
      storeRec,
    ]),
  });
};