import { KtRecordParam } from 'types';
import { ktRecord } from '../client';


/**
 * レコードを一括更新する。
 *
 * @link https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/record.md#addAllRecords
 */
export const addRecords = async (
  params: KtRecordParam<'addRecords'>,
) => {

  const KintoneRecord = await ktRecord();
  return KintoneRecord.addRecords({
    ...params,
  });
};
