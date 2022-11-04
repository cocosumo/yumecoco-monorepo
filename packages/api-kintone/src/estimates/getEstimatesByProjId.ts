import { ktRecord } from './../client';
import { KProjestimates } from 'types';
import { RecordType, appId } from './config';
import { calculateEstimateRecord } from './calculateEstimateRecord';


export const getEstimatesByProjId =  async (projId: string) => {
  if (!projId) throw new Error('Invalid project id.');

  const projIdKey : KProjestimates  = 'projId';

  const result = await (await ktRecord()).getRecords({
    app: appId,
    query: `${projIdKey} = "${projId}"`,
  })
    .then(({ records }) => {
      const newRecords = records as unknown as RecordType[];
      const calculated = newRecords.map((rec) => calculateEstimateRecord(rec));

      return {
        records: newRecords,
        calculated,
      };
    });


  return result;
};
