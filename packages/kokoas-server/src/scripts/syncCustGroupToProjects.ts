import { IProjects } from 'types';
import {APPIDS, KintoneRecord} from '../api/kintone';

export const syncCustGroupToProjects = async () => {
  try {
    const projects = await KintoneRecord.getAllRecords({
      app: APPIDS.projectDetails,
    }) as unknown as IProjects[];


    const updatedRecord = projects
      .map<{
      id: string,
      record: DeepPartial<IProjects>

    }>(({custGroupId, $id})=>{
      return {
        id: $id.value,
        record: {
          custGroupId: {value: custGroupId.value},
        },
      };
    });

    const updated = await KintoneRecord.updateAllRecords({
      app: APPIDS.projectDetails,
      records: updatedRecord as any,
    });


    return updated;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};
