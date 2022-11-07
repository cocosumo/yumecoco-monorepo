import { ktRecord } from './../client';
import { appId, RecordType } from './config';
import { KtRecordParam } from 'types';

export const getAllProjects = async (
  params?: KtRecordParam<'getAllRecords'>,
) => (await ktRecord())
  .getAllRecords({
    ...params,
    app: appId,
  })
  .then((r) => r as unknown as RecordType[]);
