import { advancedSearchCustGroup, AdvancedSearchCustGroupParam } from './advancedSearchCustGroup';

export interface ISearchData {
  '顧客ID': number,
  '状況': string,
  '顧客種別': string,
  '案件数': string,
  '顧客氏名・会社名': string,
  '現住所': string,
  '店舗': string,
  'ここすも営業': string,
  'ここすも工事': string,
  '登録日時': string,
  '更新日時': string,
}

export const dataLabelMap: Partial<Record<keyof ISearchData, keyof CustomerGroupTypes.SavedData>> = {
  '顧客ID': 'レコード番号',
  '状況': 'レコード番号',
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


  const { records, totalCount } = (await advancedSearchCustGroup(
    params,
  ));

  const normalizedData = records
    ?.map((
      record,
    ) => {
      const {
        $id, storeName, members, 更新日時: updatedDate, 作成日時: createdDate,
      } = record as unknown as CustomerGroupTypes.SavedData;

      const { address, customerName  } = members?.value?.[0]?.value ?? {} ;

      return {
        '顧客ID': +($id?.value ?? 0),
        '状況': 'XXX',
        '案件数': '0',
        '店舗': storeName?.value,
        '顧客種別': '個人',
        '現住所': address?.value ?? '-',
        '顧客氏名・会社名': customerName?.value ?? '-',
        'ここすも営業': 'テスト',
        'ここすも工事': 'テスト',
        '登録日時':updatedDate?.value,
        '更新日時': createdDate?.value,
      };
    });


  return {
    normalizedData,
    totalCount: +(totalCount  ?? 0),
  };
};
