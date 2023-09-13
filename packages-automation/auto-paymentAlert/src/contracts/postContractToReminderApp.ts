import { PaymentReminderRecordType } from '../../config';



/**
 * 入金確認リマインダーアプリへレコードを更新する処理
 * @deprecated 入金アラートの実装方法を変更します
 */
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
