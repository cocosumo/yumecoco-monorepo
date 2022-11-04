import { KtRecordParam } from 'types';
import { ktRecord } from '../client';

export const getAllRecords = async <T = unknown>(
  params: KtRecordParam<'getAllRecords'>,
) => (await ktRecord())
  .getAllRecords({
    ...params,
  })
  .then((r) => r as unknown as T[]);