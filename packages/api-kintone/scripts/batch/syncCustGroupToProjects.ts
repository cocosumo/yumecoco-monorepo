import { DeepPartial, IProjects } from 'types';
import { AppIds } from 'config';
import { ktRecord } from 'api-kintone';

export const syncCustGroupToProjects = async () => {
  const KintoneRecord = await ktRecord();
  const appId = AppIds.projects;
  try {
    const projects = await KintoneRecord.getAllRecords({
      app: appId,
    }) as unknown as IProjects[];


    const updatedRecord = projects
      .map<{
      id: string,
      record: DeepPartial<IProjects>

    }>(({ custGroupId, $id })=>{
      return {
        id: $id.value,
        record: {
          custGroupId: { value: custGroupId.value },
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
