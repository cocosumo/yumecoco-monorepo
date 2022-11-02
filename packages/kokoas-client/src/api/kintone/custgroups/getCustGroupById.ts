import { ICustgroups } from 'types';
import { APPIDS, KintoneRecord } from '../config';

export const getCustGroupById = (custGroupId: string) => {
  return KintoneRecord.getRecord({
    app: APPIDS.custGroup,
    id: custGroupId,
  }).then(({ record }) => record as unknown as ICustgroups );

};