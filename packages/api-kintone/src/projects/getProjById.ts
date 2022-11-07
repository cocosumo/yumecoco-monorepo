import { ktRecord } from '../client';
import { appId, RecordType } from './config';

export const getProjById = async (
  projId: string,
) => (await ktRecord())
  .getRecord({
    app: appId,
    id: projId,
  })
  .then(({ record }) => record as unknown as RecordType);
