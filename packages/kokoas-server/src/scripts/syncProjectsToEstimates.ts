import { AppIds } from 'config';
import { DeepPartial, IProjestimates } from 'types';
import { APPIDS, KintoneRecord } from '../api/kintone';

export const syncProjectsToEstimates = async () => {
  try {
    const projects = await KintoneRecord.getAllRecords({
      app: AppIds.projEstimates,
    }) as unknown as IProjestimates[];


    const updatedRecord = projects
      .map<{
      id: string,
      record: DeepPartial<IProjestimates>

    }>(({ projId, $id })=>{
      return {
        id: $id.value,
        record: {
          projId: { value: projId.value },
        },
      };
    });

    const updated = await KintoneRecord.updateAllRecords({
      app: APPIDS.projEstimate,
      records: updatedRecord as any,
    });


    return updated;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};
