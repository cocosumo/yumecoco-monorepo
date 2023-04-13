
import { KtRecordParam } from 'types';
import { KintoneClientBasicAuth } from 'api-kintone/scripts/batch/settings';


/**
 * レコードを一括更新する。
 *
 * @link https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/record.md#updateAllRecords
 */
export const updateAllRecords = async (
  params: KtRecordParam<'updateAllRecords'>,
) => {

  const KintoneRecord = KintoneClientBasicAuth.record;
  return KintoneRecord.updateAllRecords({
    ...params,
  });
};
