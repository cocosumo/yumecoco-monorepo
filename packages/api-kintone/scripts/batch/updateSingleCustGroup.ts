import { AppIds } from 'config';
import { KintoneClientBasicAuth } from './settings';

export const updateSingleCustGroup = async () => {
  const recordId = '17';

  const KintoneRecord = KintoneClientBasicAuth.record;


  const cgAppId = AppIds.custGroups;

  return KintoneRecord.updateRecord({
    app: cgAppId,
    id: recordId,
    record: {
      $id: { value: recordId },
      members: {
        value: [{ value: {
          custId: { value: '118a4ddf-edba-4003-af54-5473102df3ba' },
        } }],

      },
    },
  });

};
