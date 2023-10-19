
import { KtRecordParam } from 'types';
import { ktRecord } from '../client';


/**
 * レコードを一括更新する。
 *
 * @link https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/record.md#updateAllRecords
 */
export const updateAllRecords = async (
  params: KtRecordParam<'updateAllRecords'>,
) => {

  const KintoneRecord = await ktRecord() ;
  return KintoneRecord.updateAllRecords({
    ...params,
  });
};
