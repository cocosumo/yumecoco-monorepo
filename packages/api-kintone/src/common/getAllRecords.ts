import { KtRecordParam } from 'types';
import { ktRecord } from '../client';

/**
 * 行数制限なしで、レコードを全て取得する。
 *
 * order by, limit, and offset はクエリ使えない。
 *
 * @link https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/record.md#getallrecords
 */
export const getAllRecords = async <T>(
  params: KtRecordParam<'getAllRecords'>,
) => {

  /* Defaults */
  const {
    withCursor = false,
  } = params;

  return (await ktRecord())
    .getAllRecords({
      ...params,
      withCursor,
    })
    .then((r) => r as unknown as T[]);
};