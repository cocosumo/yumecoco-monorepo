import { dateStrToJA } from 'kokoas-client/src/helpers/utils';
import { ICustgroups, TAgents } from 'types';
import { AdvancedSearchCustGroupParam, useAdvancedSearchCustGroup } from './useAdvancedSearchCustGroup';

export interface ISearchData {
  '顧客ID': number,
  '顧客種別': string,
  '案件数': string,
  '顧客氏名・会社名': string,
  '現住所': string,
  '領域・店舗': string,
  'ゆめてつAG': string,
  'ここすも営業': string,
  '登録日時': string,
  '更新日時': string,
}

/**
 * react-query化
 * @param params
 * @returns
 */
export const useSearchResult = (params : AdvancedSearchCustGroupParam) => {

  const { data: records } = useAdvancedSearchCustGroup(params);


  const normalizedData = records
    ?.map((
      record,
    ) => {
      const {
        $id,
        storeName,
        custType,
        members,
        agents,
        更新日時: updatedDate,
        作成日時: createdDate,
        territory,
        projectCount,
      } = record as unknown as ICustgroups;

      const { address1, address2, postal,  customerName  } = members?.value?.[0]?.value ?? {} ;

      return {
        '顧客ID': +($id?.value ?? 0),

        '案件数': projectCount.value,
        '領域・店舗': [territory?.value, storeName?.value].filter(Boolean).join(' - '),
        '顧客種別': custType?.value ?? '個人',
        '現住所': `${[postal, address1, address2]
          .map(item=> item?.value ?? '')
          .join(' ')}` ?? '',
        'ゆめてつAG': agents.value
          .filter(item => item.value.agentType.value === 'yumeAG' as TAgents)
          ?.map(item => item.value.employeeName.value)
          .join('、 ') ?? '',
        '顧客氏名・会社名': customerName?.value ?? '-',
        'ここすも営業': agents.value
          .filter(item => item.value.agentType.value === 'cocoAG' as TAgents)
          ?.map(item => item.value.employeeName.value)
          .join('、 ') ?? '',
        '登録日時': dateStrToJA(createdDate.value),
        '更新日時': dateStrToJA(updatedDate.value),
      };
    });


  return {
    normalizedData,
    totalCount: normalizedData?.length || 0,
  };
};
