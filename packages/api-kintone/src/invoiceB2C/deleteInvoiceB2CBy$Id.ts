import { ktRecord } from '../client';
import { appId } from './config';


/**
 * 請求書を削除する。
 * 
 * @param id kintoneのレコード番号
 * @returns 
 */
export const deleteInvoiceB2CBy$Id = async (id: string) => {
  
  const KintoneRecord = await ktRecord() ;

  return KintoneRecord.deleteRecords({
    app: appId,
    ids: [id],
  });
};