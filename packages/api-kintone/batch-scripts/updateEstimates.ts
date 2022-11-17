import { DeepPartial, IProjestimates } from 'types';
import { AppIds } from 'config';
import { ktRecord } from 'api-kintone';


export const updateEstimates = async () => {
  const KintoneRecord = await ktRecord();
  const appId = AppIds.projEstimates;

  try {
    const records = await KintoneRecord.getAllRecords({
      app: appId,
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
      app: appId,
      records: updatedRecords as any,
    });

    return updated;
  } catch (err : any) {
    throw new Error(err.message);
  }
};
