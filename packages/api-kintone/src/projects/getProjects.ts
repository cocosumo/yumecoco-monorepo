import { getRecords } from '../common';
import { appId, RecordType } from './config';

export const getProjects = async (
  params?: Omit<Parameters<typeof getRecords>[0], 'app'>,
) => getRecords<RecordType>({
  ...params,
  app: appId,
});
