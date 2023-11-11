import { DeepPartial, ICustgroups } from 'types';
import { AppIds } from 'config';
import { KintoneClientBasicAuth } from './settings';
import fs from 'fs';
import path from 'path';

const testDir = path.resolve(__dirname, './__TEST__');
if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);

export const updateCustGroup = async () => {


  const KintoneRecord = KintoneClientBasicAuth.record;


  const cgAppId = AppIds.custGroups;

  try {
    const cgRecords = await KintoneRecord.getAllRecords({
      app: cgAppId,
    }) as unknown as ICustgroups[];


    const updatedRecords = cgRecords
      .map<{
      id: string,
      record: DeepPartial<ICustgroups>

    }>(({
      $id,
      members,
    })=>{

      return {
        id: $id.value,
        record: {
          $id: { value: $id.value },
          members: {
            type: 'SUBTABLE',
            value: members.value,
          },
          /* custNames: {
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
          }, */
        },
      };
    });

    fs.writeFileSync(
      path.resolve(testDir, `./${cgAppId}-updatedCustGroup${new Date().getTime()}.json`),
      JSON.stringify(updatedRecords, null, 2),
    );

    const updated = await KintoneRecord.updateAllRecords({
      app: cgAppId,
      records: updatedRecords as any,
    });

    return updated; 
  } catch (err : any) {
    throw new Error(err.message);
  }
};
