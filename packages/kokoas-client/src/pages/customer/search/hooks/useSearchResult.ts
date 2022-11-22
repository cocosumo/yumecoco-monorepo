import { groupCustContacts } from './helper/groupCustContact';
import { dateStrToJA } from 'kokoas-client/src/helpers/utils';
import { useCustGroups, useProjects, useCustomers } from 'kokoas-client/src/hooksQuery';
import { TAgents } from 'types';
import { TypeOfForm } from '../form';
import { ISearchData } from '../parts/TableResult/settings';

/**
 * @param params
 * @returns
 */
export const useSearchResult = (params?: Partial<TypeOfForm>) => {

  const { data: projRecs } = useProjects();
  const { data: custRecs } = useCustomers();


  return useCustGroups({
    enabled: !!projRecs && !!custRecs,
    select: (data) => {
      const {
        cocoAG,
        custName,
        storeId,
        territory,
        yumeAG,
        address,
        custType,
        email,
        contactNum,
        cocoConst,
      } = params || {};
    
      return data?.reduce(
        (acc, rec) => {

          
          const mainCust = rec?.members?.value?.[0]?.value;

          
          // 古いテストレコードでmembersのサブテーブルがないので、結果に出さない
          if (!mainCust) return acc;
          
          const relProjects = projRecs?.filter(({ custGroupId }) => custGroupId.value === rec.$id.value  );
          const relCustomers = custRecs?.filter(({ $id }) => rec?.members?.value.some(({ value: { customerId } }) => customerId.value === $id.value )) || [];
          
          const recYumeAG = rec.agents?.value
            ?.filter(item => item.value.agentType.value === 'yumeAG' as TAgents);
          const recCocoAG = rec.agents.value
            ?.filter(item => item.value.agentType.value === 'cocoAG' as TAgents);
         
          
          const { custEmails, custTels } = groupCustContacts(relCustomers);

          // フィルター条件してい
          if (!params
            || (
              (!storeId || storeId === rec?.storeId.value)
              && (custType === '全て' || rec.custType.value === custType)
              && (!cocoAG || recCocoAG.some(({ value: { employeeId } }) => employeeId.value === cocoAG ))
              && (!territory || territory === rec?.territory.value )
              && (!yumeAG || recYumeAG.some(({ value: { employeeId } }) => employeeId.value === yumeAG ))
              && (!custName || rec?.members?.value?.some(({ value: { customerName } }) => customerName.value.includes(custName) ))
              && (!email || custEmails.some((s) => s.includes(email)))
              && (!contactNum || custTels.some((s) => s.includes(contactNum)))
              && (!cocoConst || relProjects?.some(({ agents }) => agents.value.some(({ value: { agentId } }) => agentId.value === cocoConst)))
              && (!address 
                  || rec?.members?.value?.some(({ value: { postal, address1, address2 } }) => [postal.value, address1.value, address2.value].some((s) => s.includes(address)))
                  || relProjects?.some(({ postal, address1, address2 }) => [postal.value, address1.value, address2.value].some((s) => s.includes(address)))
              )
            )) {

            acc.push({  
              '顧客ID': +(rec.$id?.value ?? 0),
              '顧客氏名・会社名': mainCust?.customerName?.value ?? '-',
              '案件数': (relProjects?.length || 0).toString(),
              '領域・店舗': [rec.territory?.value, rec.storeName?.value].filter(Boolean).join(' - '),
              '顧客種別': rec.custType?.value ?? '個人',
              '現住所': `${[mainCust?.postal.value, mainCust?.address1.value, mainCust?.address2.value]
                .filter(Boolean)
                .join(' ')}` ?? '',
              'ゆめてつAG': recYumeAG
                ?.map(item => item.value.employeeName.value)
                .join('、 ') ?? '',
              'ここすも営業': recCocoAG
                ?.map(item => item.value.employeeName.value)
                .join('、 ') ?? '',
              '工事担当(最近)': relProjects?.at(-1)?.agents.value.map(({ value: { agentName } }) => agentName.value).filter(Boolean).join(', ') || '',
              '登録日時': dateStrToJA(rec.作成日時.value),
              '更新日時': dateStrToJA(rec.更新日時.value),
            });
          }

          return acc;
        },
        [] as ISearchData[]);
    },
 
  });

};
