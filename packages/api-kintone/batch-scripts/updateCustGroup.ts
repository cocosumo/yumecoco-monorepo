import { DeepPartial, ICustgroups, ICustomers } from 'types';
import { AppIds } from 'config';
import { ktRecord } from 'api-kintone';

export const updateCustGroup = async () => {
  const KintoneRecord = await ktRecord();
  const appId = AppIds.custGroups;

  try {
    const records = await KintoneRecord.getAllRecords({
      app: appId,
    }) as unknown as ICustgroups[];

    const customerRecords = await KintoneRecord.getAllRecords({
      app: AppIds.customers,
    }) as unknown as ICustomers[];


    const updatedRecords = records
      .map<{
      id: string,
      record: DeepPartial<ICustgroups>

    }>(({
      $id,
      agents,
      members,
    })=>{
      const getCustData = (cId: string) => customerRecords.find(({
        $id: custId,
      }) => custId.value === cId);
      return {
        id: $id.value,
        record: {
          members: {
            type: 'SUBTABLE',
            value: members.value.map((row) => {
              const { value } = row;
              const { customerId } = value;
              return {
                ...row,
                value: {
                  ...value,
                  dump: { value: JSON.stringify(getCustData(customerId.value)) },
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
