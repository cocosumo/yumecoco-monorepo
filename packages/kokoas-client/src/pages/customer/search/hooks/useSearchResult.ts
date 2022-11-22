import { dateStrToJA } from 'kokoas-client/src/helpers/utils';
import { useCustGroups } from 'kokoas-client/src/hooksQuery';
import {  RecordStatus, TAgents } from 'types';
import { ISearchData } from '../parts/TableResult/settings';


export interface ISearchFilter {
  storeId?: string,
  custName?: string,
  phone?: string,
  address?: string,
  email?: string,
  yumeAG?: string,
  cocoAG?: string,
  cocoConst?: string,
  custType?: string,
  recordStatus?: RecordStatus[],
}

/**
 * @param params
 * @returns
 */
export const useSearchResult = (params?: ISearchFilter) => {

  return useCustGroups({
    select: (data) => {
      const {
        storeId,
      } = params || {};

      console.log(data);
      return data?.reduce(
        (acc, rec) => {

          if (!params
            || (
              (!storeId || storeId === rec?.storeId.value)
            )) {
            const mainCust = rec?.members.value?.[0].value;

            acc.push({
              '顧客ID': +(rec.$id?.value ?? 0),

              '案件数': rec.projectCount.value,
              '領域・店舗': [rec.territory?.value, rec.storeName?.value].filter(Boolean).join(' - '),
              '顧客種別': rec.custType?.value ?? '個人',
              '現住所': `${[mainCust.postal, mainCust.address1, mainCust.address2]
                .map(item=> item?.value ?? '')
                .join(' ')}` ?? '',
              'ゆめてつAG': rec.agents?.value
                .filter(item => item.value.agentType.value === 'yumeAG' as TAgents)
                ?.map(item => item.value.employeeName.value)
                .join('、 ') ?? '',
              '顧客氏名・会社名': mainCust.customerName?.value ?? '-',
              'ここすも営業': rec.agents.value
                .filter(item => item.value.agentType.value === 'cocoAG' as TAgents)
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
