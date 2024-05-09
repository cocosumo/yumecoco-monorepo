import { getAllRecords } from '../common';
import { appId, RecordType } from './config';

export const getAllProjects = async (
  params?: Omit<Parameters<typeof getAllRecords>[0], 'app'>,
) => getAllRecords<RecordType>({
  ...params,
  app: appId,
});