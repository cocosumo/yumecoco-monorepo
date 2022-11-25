import { DeepPartial, ICustgroups } from 'types';
import { AppIds } from 'config';
import { KintoneClientBasicAuth } from './settings';


export const updateCustGroup = async () => {


  const KintoneRecord = KintoneClientBasicAuth.record;


  const appId = AppIds.custGroups;
  try {
    const records = await KintoneRecord.getAllRecords({
      app: appId,
    }) as unknown as ICustgroups[];


    const updatedRecords = records
      .map<{
      id: string,
      record: DeepPartial<ICustgroups>

    }>(({
      $id,
      agents,
      members,
      storeId,
    })=>{

      return {
        id: $id.value,
        record: {
          $id: { value: $id.value },
          storeId,
          members: {
            type: 'SUBTABLE',
            value: members.value.map((row) => {
              const { value } = row;
              return {
                ...row,
                value: {
                  ...value,
                },
              };
            }),
          },
          custNames: {
            value: members.value
              .map(({ value: { customerName } })=>customerName.value)
              .join(','),
          },
          yumeAGNames: {
            value: agents.value
              .filter((
                { value: { agentType, employeeName } },
              ) => !!employeeName.value && agentType.value === 'yumeAG' )
              .map(({ value: { employeeName } })=>employeeName.value)
              .join(', '),
          },
          cocoAGNames: {
            value: agents.value
              .filter((
                { value: { agentType, employeeName } },
              ) => !!employeeName.value && agentType.value === 'cocoAG' )
              .map(({ value: { employeeName } })=>employeeName.value)
              .join(', '),
          },
        },
      };
    });


    const updated = await KintoneRecord.updateAllRecords({
      app: appId,
      records: updatedRecords as any,
    });

    return updated;
  } catch (err : any) {
    throw new Error(err.message);
  }
};
