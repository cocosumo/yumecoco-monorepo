import { DeepPartial, IProjestimates } from 'types';
import { APPIDS, KintoneRecord } from '../api/kintone';

export const updateEstimates = async () => {
  try {
    const records = await KintoneRecord.getAllRecords({
      app: APPIDS.projEstimate,
    }) as unknown as IProjestimates[];


    const updatedRecords = records
      .map<{
      id: string,
      record: DeepPartial<IProjestimates>

    }>(({
      $id,
      projId,
    })=>{
      return {
        id: $id.value,
        record: {
          projId: projId,
        },
      };
    });

    console.log(updatedRecords);

    const updated = await KintoneRecord.updateAllRecords({
      app: APPIDS.projEstimate,
      records: updatedRecords as any,
    });

    return updated;
  } catch (err : any) {
    throw new Error(err.message);
  }
};
