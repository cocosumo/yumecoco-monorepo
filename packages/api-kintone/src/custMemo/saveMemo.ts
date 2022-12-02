import { saveRecordByUpdateKey } from '../common/saveRecordByUpdateKey';
import { appId, RecordType } from './config';

export const saveMemo = async ({
  id,
  record,
}:{
  id: string,
  record: Partial<RecordType>
}) => {
  return saveRecordByUpdateKey({
    app: appId,
    record: record,
    updateKey: {
      field: 'uuid',
      value: id,
    },
  });
};