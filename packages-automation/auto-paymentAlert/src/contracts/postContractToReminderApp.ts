import { PaymentRemainderRecordType } from '../../config';



/**入金確認リマインダーアプリへレコードを更新する処理 */
export const postContractToReminderApp = async ({
  convertDatas,
}:{
  convertDatas: {
    addRecords: Partial<PaymentRemainderRecordType>[]
    updateRecords: Partial<PaymentRemainderRecordType>[]
  }
}) => {
  

  // TODO
  console.log('convertDatas', convertDatas);


};
