
import { KtRecordParam } from 'types';


/**
 * レコードを一括更新する。
 *
 * @link https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/record.md#updateAllRecords
 */

import { ktRecord } from '../client';

export const updateAllRecords = async <T>(
  params: KtRecordParam<'updateAllRecords'>,
) => {

  return (await ktRecord())
    .updateAllRecords({
      ...params,
    })
    .then((r) => r as unknown as T[]);
};