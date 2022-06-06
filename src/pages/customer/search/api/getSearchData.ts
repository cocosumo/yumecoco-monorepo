import { dateStrToJA } from '../../../../helpers/utils';
import { AgentType } from '../../../../types/forms';
import { advancedSearchCustGroup, AdvancedSearchCustGroupParam } from './advancedSearchCustGroup';

export interface ISearchData {
  '顧客ID': number,
  '顧客種別': string,
  '案件数': string,
  '顧客氏名・会社名': string,
  '現住所': string,
  '店舗': string,
  'ゆめてつAG': string,
  'ここすも営業': string,
  'ここすも工事': string,
  '登録日時': string,
  '更新日時': string,
}

/** @deprecated serverSide pagination not practical due kintone limitation */
export const dataLabelMap: Partial<Record<keyof ISearchData, keyof CustomerGroupTypes.SavedData>> = {
  '顧客ID': 'レコード番号',
  '顧客種別': 'レコード番号',
  '案件数': 'レコード番号',
  '顧客氏名・会社名': 'members',
  '現住所': 'agents',
  '店舗': 'storeName',
  'ここすも営業': 'agents',
  'ここすも工事': 'agents',
  '登録日時': '作成日時',
  '更新日時': '更新日時',

};



export const getSearchData = async (params : AdvancedSearchCustGroupParam) => {


  const records = (await advancedSearchCustGroup(
    params,
  ));

  const normalizedData = records
    ?.map((
      record,
    ) => {
      const {
        $id,
        storeName,
        custType,

        members,
        projects,
        agents,
        更新日時: updatedDate,
        作成日時: createdDate,
      } = record as unknown as CustomerGroupTypes.SavedData;

      const { address1, address2, postal,  customerName  } = members?.value?.[0]?.value ?? {} ;

      return {
        '顧客ID': +($id?.value ?? 0),

        '案件数': projects.value.filter(item=>item.value.constructionId.value).length.toString() ?? '',
        '店舗': storeName?.value,
        '顧客種別': custType?.value ?? '個人',
        '現住所': `${[postal, address1, address2]
          .map(item=> item?.value ?? '')
          .join(' ')}` ?? '',
        'ゆめてつAG': agents.value
          .filter(item => item.value.agentType.value === 'yumeAG' as AgentType)
          ?.map(item => item.value.employeeName.value)
          .join('、 ') ?? '',
        '顧客氏名・会社名': customerName?.value ?? '-',
        'ここすも営業': agents.value
          .filter(item => item.value.agentType.value === 'cocoAG' as AgentType)
          ?.map(item => item.value.employeeName.value)
          .join('、 ') ?? '',
        'ここすも工事': projects?.value[projects?.value.length - 1]?.value.cocoConst1Name.value ?? '',
        '登録日時': dateStrToJA(createdDate.value),
        '更新日時': dateStrToJA(updatedDate.value),
      };
    });


  return {
    normalizedData,
    totalCount: normalizedData.length,
  };
};
