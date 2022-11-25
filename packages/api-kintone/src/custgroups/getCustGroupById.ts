import { ktRecord } from '../client';

import { appId, RecordType } from './config';


export const getCustGroupById = async (custGroupId: string) => {

  return (await ktRecord()).getRecord({
    app: appId,
    id: custGroupId,
  }).then(({ record }) => record as unknown as RecordType );

};