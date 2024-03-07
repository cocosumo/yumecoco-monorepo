import { RecordID, Revision, UpdateKey } from '@kintone/rest-api-client/lib/src/client/types';
import { updateRecords } from 'api-kintone';
import { IUnissuedinvoicealert } from 'types';
import { appId } from './config';


export type UpdateUnissuedInvAlertId = {
  id: RecordID
  record?: Partial<IUnissuedinvoicealert> | undefined
  revision?: Revision | undefined
};

export type UpdateUnissuedInvAlertUDKey = {
  updateKey: UpdateKey
  record?: Partial<IUnissuedinvoicealert> | undefined
  revision?: Revision | undefined
};
export type UpdateUnissuedInvAlert = UpdateUnissuedInvAlertId | UpdateUnissuedInvAlertUDKey;


/**
 * 請求書発行アラートレコードを一括更新する
 */
export const updateUnissuedInvoiceAlert = (params: UpdateUnissuedInvAlert[]) => {

  return updateRecords({
    records: params,
    app: appId,
  });

};
