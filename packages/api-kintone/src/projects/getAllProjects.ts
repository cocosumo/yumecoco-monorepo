import { clientRecord } from '../client';
import { appId } from './config';

export const getAllProjects = async () => {
  clientRecord.then(({
    getAllRecords,
  }) => getAllRecords({
    app: appId,
  }));
};