import { DeepPartial, ICustgroups } from 'types';
import { AppIds } from 'config';
import { ktRecord } from 'api-kintone';

export const syncProjectsToCustGroup = async () => {
  const KintoneRecord = await ktRecord();
  const appId = AppIds.custGroups;
  try {
    const custGroups = await KintoneRecord.getAllRecords({
      app: appId,
    }) as unknown as ICustgroups[];

    const updatedCustGroup = custGroups
      .map<{
      id: string,
      record: DeepPartial<ICustgroups>

    }>(({ projects, $id })=>{
      return {
        id: $id.value,
        record: {

          projectCount: { value: `${projects.value.length ?? 0}` },
          projects: {
            value: projects.value.map(({ value })=>{
              const { projId } = value;

              return {
                value: {
                  projId: { value: projId.value },
                },
              };
            }),
          },
        },

      };
    });

    const updated = await KintoneRecord.updateAllRecords({
      app: appId,
      records: updatedCustGroup as any,
    });


    return updated;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};
