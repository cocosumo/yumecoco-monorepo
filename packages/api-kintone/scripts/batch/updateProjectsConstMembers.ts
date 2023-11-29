import { DeepPartial, ICustgroups, IEmployees, IProjects } from 'types';
import { AppIds } from 'config';
import { KintoneClientBasicAuth } from './settings';


/**
 * 工事担当者情報を顧客グループから取得して反映します
 * @returns 
 */
export const updateProjectsConstMembers = async () => {
  const KintoneRecord = KintoneClientBasicAuth.record;
  const projAppId = AppIds.projects;
  const cGAppId = AppIds.custGroups;
  const empAppId = AppIds.employees;

  try {
    const [
      projRecords,
      cGRecords,
      empRecords,
    ] = await Promise.all([
      KintoneRecord.getAllRecords({
        app: projAppId,
      }) as unknown as IProjects[],
      KintoneRecord.getAllRecords({
        app: cGAppId,
      }) as unknown as ICustgroups[],
      KintoneRecord.getAllRecords({
        app: empAppId,
      }) as unknown as IEmployees[],
    ]);

    const updatedRecords = projRecords
      .map<{
      id: string,
      record: DeepPartial<IProjects>
    }>(({
      $id,
      custGroupId,
      agents,
    }) => {
      const cgRec = cGRecords.find(({ uuid }) => uuid.value === custGroupId.value);

      if (!cgRec) {
        return {
          id: $id.value,
          record: {
            agents: {
              type: 'SUBTABLE',
              value: agents.value,
            },
          },
        };
      }

      const addConstMembers = cgRec.agents.value.reduce((acc, cur) => {
        const isExist = agents.value.some(({
          value: {
            agentId,
            agentType,
          },
        }) => (agentId.value === cur.value.employeeId.value) && (agentType.value === cur.value.agentType.value));

        if (isExist) return acc;

        const {
          value: {
            agentType,
            employeeId,
            employeeName,
          },
        } = cur;

        const {
          文字列＿氏名,
          役職,
        } = empRecords.find(({ uuid }) =>
          uuid.value === employeeId.value) || {};

        acc.push({
          id: '',
          value: {
            agentId: { value: employeeId.value },
            agentName: { value: 文字列＿氏名?.value || employeeName.value },
            agentType: { value: agentType.value },
            empRole: { value: 役職?.value || '' },
          },
        });

        return acc;
      }, [] as IProjects['agents']['value']);

      const newConstMembers = agents.value.concat(addConstMembers);

      return {
        id: $id.value,
        record: {
          agents: {
            type: 'SUBTABLE',
            value: newConstMembers,
          },
        },
      };
    });

    //console.log(JSON.stringify(updatedRecords, null, 2));
    console.log('update records length', updatedRecords.length, JSON.stringify(updatedRecords[updatedRecords.length - 1], null, 2));

    const updated = await KintoneRecord.updateAllRecords({
      app: projAppId,
      records: updatedRecords as any,
    });

    return updated;
  } catch (err: any) {
    console.log('errMsg::', err);
    throw new Error(err.message);
  }
};
