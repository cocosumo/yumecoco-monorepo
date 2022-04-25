import { advancedSearchCustGroup } from '../../../../api/kintone/custgroups/GET';
import { initialValues } from '../form';

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

export const getSearchData = async ({
  storeId,
  custName,

} : Partial<typeof initialValues>) => {

  return advancedSearchCustGroup({
    storeId,
    custName,
  })
    .then(data => {

      return (data as unknown as CustomerGroupTypes.SavedData[])?.map(({
        $id, storeName, members, 更新日時: updatedDate, 作成日時: createdDate,
      }) => {
        const { address, customerName  } = members?.value?.[0]?.value ?? {} ;

        return {
          '顧客ID': +($id?.value ?? 0),
          '状況': 'XXX',
          '案件数': '5',
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

    });
};
