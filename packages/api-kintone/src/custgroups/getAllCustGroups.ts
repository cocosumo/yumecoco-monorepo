import { appId, RecordType } from './config';
import { getAllRecords } from '../common';


export const getAllCustGroups = async (
  params?: Omit<Parameters<typeof getAllRecords>[0], 'app'>,
) => getAllRecords<RecordType>({
  ...params,
  app: appId,
});
