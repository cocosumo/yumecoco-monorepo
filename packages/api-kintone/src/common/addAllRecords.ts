import { KintoneClientBasicAuth } from 'api-kintone/scripts/batch/settings';
import { KtRecordParam } from 'types';


/**
 * レコードを一括更新する。
 *
 * @link https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/record.md#addAllRecords
 */
export const addAllRecords = async (
  params: KtRecordParam<'addAllRecords'>,
) => {

  const KintoneRecord = KintoneClientBasicAuth.record;
  return KintoneRecord.addAllRecords({
    ...params,
  });
};
