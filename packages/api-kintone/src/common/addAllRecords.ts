import { KtRecordParam } from 'types';
import { ktRecord } from '../client';


/**
 * レコードを一括更新する。
 *
 * @link https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/record.md#addAllRecords
 */
export const addAllRecords = async (
  params: KtRecordParam<'addAllRecords'>,
) => {

  const KintoneRecord = await ktRecord();
  return KintoneRecord.addAllRecords({
    ...params,
  });
};
