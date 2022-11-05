import { ktRecord } from './../client';
import { RecordType, appId } from './config';

/**
 * 複数顧客を保存する
 * ※ saveCustGroupと異なるDBで以下の関係があります。
 *  custGroup n-n customers
 * @param isAllNew
 * @param records 顧客のレコードの配列 array of customer records.
 * @todo 3段階処理があり、より細かい単体テストが出来るようにファイル分割する。
 */
export const saveCustomers = async (
  {
    records,
  }:
  {
    records: Array<Partial<RecordType>>
  },
) => {
  const KintoneRecord = await ktRecord();

  /********************************************************
  * In edit mode, user could add customers
  * aside from existing ones. So we filter the ones without
  * customerId, then add them to db.
  *********************************************************/
  const unsavedCust = records.filter(cust => !cust.$id?.value);
  let savedRecords = [] as { id: string, revision: string }[];

  if (unsavedCust.length > 0) {
    savedRecords = await KintoneRecord.addRecords({
      app: appId,
      records: unsavedCust,
    }).then(resp => resp.records);
  }


  /*********************************
   * For those with existing customerId,
   * do an update operation
   *********************************/
  return KintoneRecord.updateRecords({
    app: appId,
    records: records
      .filter(cust => !!cust.$id?.value)
      .map(cust => {
        if (!cust?.$id?.value) throw new Error('Invalid cust id during update.');

        return  {
          id: cust?.$id?.value,
          record: cust,
        };
      }),
  })
    /* concatinate results of both the add and update operations */
    .then(resp => resp.records.concat(savedRecords));

};