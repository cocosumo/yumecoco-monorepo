import { DeepPartial, IProjects } from 'types';
import { AppIds } from 'config';
import { ktRecord } from 'api-kintone';

export const updateProjects = async () => {
  const KintoneRecord = await ktRecord();
  const appId = AppIds.projects;

  try {
    const records = await KintoneRecord.getAllRecords({
      app: appId,
    }) as unknown as IProjects[];


    const updatedRecords = records
      .map<{
      id: string,
      record: DeepPartial<IProjects>

    }>(({
      $id,
      custGroupId,
      agents,
    })=>{
      return {
        id: $id.value,
        record: {
          custGroupId: custGroupId,
          cocoConstNames: {
            value: agents.value
              .map(({ value: { agentName } }) => agentName.value)
              .filter(Boolean)
              .join(', '),
          },
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
