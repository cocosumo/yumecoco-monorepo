import { DeepPartial, ICustgroups, ICustomers } from 'types';
import { AppIds } from 'config';
import { KintoneClientBasicAuth } from './settings';
import fs from 'fs';
import path from 'path';

const testDir = path.resolve(__dirname, './__TEST__');
if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);

export const updateCustGroup = async () => {


  const KintoneRecord = KintoneClientBasicAuth.record;


  const cgAppId = AppIds.custGroups;
  const custAppId = AppIds.customers;

  try {
    const cgRecords = await KintoneRecord.getAllRecords({
      app: cgAppId,
    }) as unknown as ICustgroups[];

    const custRecords = await KintoneRecord.getAllRecords({
      app: custAppId,
    }) as unknown as ICustomers[];


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
          $id: { 
            type: '__ID__',
            value: $id.value, 
          },
          members: {
            value: members.value
              .map(({
                value: {
                  custId,
                },
              }) => {
                return {
                  value: {
                    custId: { value: custId.value },
                  },
                };
              }),

          },
        },
      };
    })
      .filter(({ record: { members } }) => {
        return members?.value?.every((mem) => {
          return custRecords.some((c) => c.uuid.value === mem?.value?.custId?.value);
        });
      });

    const toProcess = updatedRecords as any;

    fs.writeFileSync(
      path.resolve(testDir, `./${cgAppId}-updatedCustGroup${new Date().getTime()}.json`),
      JSON.stringify(toProcess, null, 2),
    );

    const updated = await KintoneRecord.updateAllRecords({
      app: cgAppId,
      records: toProcess,
    });

    return updated; 
  } catch (err : any) {
    fs.writeFileSync(
      path.resolve(testDir, `./${cgAppId}-updatedCustGroup-error-${new Date().getTime()}.json`),
      JSON.stringify(err, null, 2),
    );
    throw new Error(err.message);
  }
};
