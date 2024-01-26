
import { KtRecordParam } from 'types';
import { ktRecord } from '../client';


/**
 * レコードを一括更新する。
 *
 * @link https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/record.md#deleteRecords
 */
export const deleteRecords = async (
  params: KtRecordParam<'deleteRecords'>,
) => {

  const KintoneRecord = await ktRecord() ;
  return KintoneRecord.deleteRecords({
    ...params,
  });
};
