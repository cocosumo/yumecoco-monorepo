import { KtRecordParam } from 'types';
import { ktRecord } from '../client';

/**
 * レコード取得する。
 * 上限500件
 *
 * limitが使えるので、ページネーションに適切
 *
 * @link https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/record.md#getrecords
 */
export const getRecords = async <T>(
  params: KtRecordParam<'getRecords'>,
) => {
  const {
    totalCount = true,
  } = params || {};

  return (await ktRecord())
    .getRecords({
      ...params,
      totalCount,
    })
    .then((result) => ({
      ...result,
      records: result.records as unknown as T[],
    }));
};