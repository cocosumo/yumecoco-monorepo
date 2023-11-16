import { KtRecordParam } from 'types';
import { ktRecord } from '../client';

/**
 * レコードを取得する。
 * */
export const getRecord = async <T>(
  params: KtRecordParam<'getRecord'>,
) => {


  return (await ktRecord())
    .getRecord({
      ...params,
    }) as unknown as { record: T };
};