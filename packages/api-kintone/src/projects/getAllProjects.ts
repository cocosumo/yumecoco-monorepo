import { ktRecord } from './../client';
import { appId, RecordType } from './config';
import { RecordClientParam } from 'types';

export const getAllProjects = async (
  params?: RecordClientParam<'getAllRecords'>,
) => (await ktRecord())
  .getAllRecords({
    ...params,
    app: appId,
  })
  .then((r) => r as unknown as RecordType[]);
