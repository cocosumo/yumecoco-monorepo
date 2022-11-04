import { IProjestimates, KProjestimates } from 'types';
import { calculateEstimateRecord } from '../../others/calculateEstimateRecord';
import { APPIDS, KintoneRecord } from '../config';


export const getEstimatesByProjId =  async (projId: string) => {
  if (!projId) throw new Error('Invalid project id.');

  /*   const result = await KintoneRecord.getRecords({
    app: APPIDS.projectEstimate,
    query: `${getProjEstimateKeys('projId')} = "${projId}"`,
  }); */
  const projIdKey : KProjestimates  = 'projId';

  const result = await KintoneRecord.getRecords({
    app: APPIDS.projectEstimate,
    query: `${projIdKey} = "${projId}"`,
  })
    .then(({ records }) => {
      const newRecords = records as unknown as IProjestimates[];
      const calculated = newRecords.map((rec) => calculateEstimateRecord(rec));

      return {
        records: newRecords,
        calculated,
      };
    });


  return result;
};
