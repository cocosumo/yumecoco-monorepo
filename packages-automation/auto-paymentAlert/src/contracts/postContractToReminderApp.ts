import { PaymentReminderRecordType } from '../../config';



/**入金確認リマインダーアプリへレコードを更新する処理 */
export const postContractToReminderApp = async ({
  convertDatas,
}: {
  convertDatas: {
    addRecords: Partial<PaymentReminderRecordType>[]
    updateRecords: Partial<PaymentReminderRecordType>[]
  }
}) => {


  // TODO
  console.log('convertDatas', convertDatas);


};
