import { dateStrToJA } from 'kokoas-client/src/helpers/utils';
import { useCustGroups } from 'kokoas-client/src/hooksQuery';
import { TAgents } from 'types';
import { TypeOfForm } from '../form';
import { ISearchData } from '../parts/TableResult/settings';

/**
 * @param params
 * @returns
 */
export const useSearchResult = (params?: Partial<TypeOfForm>) => {


  return useCustGroups({
    select: (data) => {
      const {
        cocoAG,
        custName,
        storeId,
        territory,
        yumeAG,
      } = params || {};
    
      return data?.reduce(
        (acc, rec) => {

          const mainCust = rec?.members?.value?.[0]?.value;

          const recYumeAG = rec.agents?.value
            ?.filter(item => item.value.agentType.value === 'yumeAG' as TAgents);
          const recCocoAG = rec.agents.value
            ?.filter(item => item.value.agentType.value === 'cocoAG' as TAgents);

          // 古いテストでmembersのサブテーブルがない、結果に出さない
          if (!mainCust) return acc;
   
          // フィルター条件
          if (!params
            || (
              (!storeId || storeId === rec?.storeId.value)
              && (!cocoAG || recCocoAG.some(({ value: { employeeId } }) => employeeId.value === cocoAG ))
              && (!territory || territory === rec?.territory.value )
              && (!yumeAG || recYumeAG.some(({ value: { employeeId } }) => employeeId.value === yumeAG ))
              && (!custName || rec?.members?.value?.some(({ value: { customerName } }) => customerName.value.includes(custName) ))
            )) {

            acc.push({  
              '顧客ID': +(rec.$id?.value ?? 0),
              '案件数': rec.projectCount.value || '0',
              '領域・店舗': [rec.territory?.value, rec.storeName?.value].filter(Boolean).join(' - '),
              '顧客種別': rec.custType?.value ?? '個人',
              '現住所': `${[mainCust?.postal.value, mainCust?.address1.value, mainCust?.address2.value]
                .filter(Boolean)
                .join(' ')}` ?? '',
              'ゆめてつAG': recYumeAG
                ?.map(item => item.value.employeeName.value)
                .join('、 ') ?? '',
              '顧客氏名・会社名': mainCust?.customerName?.value ?? '-',
              'ここすも営業': recCocoAG
                ?.map(item => item.value.employeeName.value)
                .join('、 ') ?? '',
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
