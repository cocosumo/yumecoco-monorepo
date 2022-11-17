import { AppIds } from 'config';
import { DeepPartial, IProjestimates } from 'types';
import { ktRecord } from 'api-kintone/src';

export const syncProjectsToEstimates = async () => {
  const KintoneRecord = await ktRecord();
  const appId = AppIds.projEstimates;
  try {
    const projects = await KintoneRecord.getAllRecords({
      app: appId,
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
      app: appId,
      records: updatedRecord as any,
    });


    return updated;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};
