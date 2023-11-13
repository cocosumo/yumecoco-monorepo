import { v4 as uuidV4 } from 'uuid';
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
  const newCusts = records
    .filter(cust => !cust.uuid?.value)
    .map((recCust) => ({
      ...recCust,
      uuid: { value: uuidV4() },
    }));

  if (newCusts?.length > 0) {
    await KintoneRecord.addRecords({
      app: appId,
      records: newCusts,
    }).then(resp => resp.records);
  }

  const oldCusts = records.filter(cust => !!cust.uuid?.value) || [];

  /*********************************
   * For those with existing customerId,
   * do an update operation
   *********************************/

  if (oldCusts?.length) {
    await KintoneRecord.updateRecords({
      app: appId,
      records: oldCusts
        .map(cust => {
          if (!cust?.uuid?.value) throw new Error('Invalid cust id during update.');
          const {
            uuid,
            ...recordToUpdate
          } = cust;

          return  {
            updateKey: {
              field: 'uuid',
              value: uuid.value,
            },
            record: recordToUpdate,
          };
        }),
    });
  }



  return  [
    ...newCusts,
    ...oldCusts,
  ];

};