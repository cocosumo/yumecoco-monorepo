import { DeepPartial, ICustgroups, IEmployees, IProjects } from 'types';
import { AppIds } from 'config';
import { ktRecord } from 'api-kintone';


/**
 * 工事担当者情報を顧客グループから取得して反映します
 * @returns 
 */
export const updateProjectsConstMembers = async () => {
  const KintoneRecord = await ktRecord();
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
            custGroupId: custGroupId,
            cocoConstNames: {
              value: agents.value
                .map(({ value: { agentName } }) => agentName.value)
                .filter(Boolean)
                .join(', '),
            },
          },
        };
      }

      const addConstMembers = cgRec.agents.value.reduce((acc, cur) => {
        const isExist = agents.value.some(({ value: { agentId } }) =>
          agentId.value === cur.value.employeeId.value);

        if (isExist) return acc;

        const {
          value:{
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
          custGroupId: custGroupId,
          cocoConstNames: {
            value: newConstMembers
              .map(({ value: { agentName } }) => agentName.value)
              .filter(Boolean)
              .join(', '),
          },
        },
      };
    });

    console.log(updatedRecords);

    const updated = await KintoneRecord.updateAllRecords({
      app: projAppId,
      records: updatedRecords as any,
    });

    return updated;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
