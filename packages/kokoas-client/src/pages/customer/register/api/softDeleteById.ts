import { ICustgroups } from 'types';
import { APPIDS, KintoneRecord } from '../../../../api/kintone';

export const softDeleteById = (id: string) => {
  return KintoneRecord.updateRecord({
    app: APPIDS.custGroup,
    id: id,
    record: {
      isDeleted: {
        value: (+true).toString(),
      },
    } as Partial<ICustgroups>,
  });
};