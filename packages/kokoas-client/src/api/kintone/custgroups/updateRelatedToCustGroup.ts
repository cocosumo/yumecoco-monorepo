import { ICustgroups } from 'types';
import { updateRelated } from '../common/updateRelated';
import { APPIDS } from '../config';

/**
 * 関連レコードを更新する
 * 
 * custGroupId 1-n projects 1-n projEstimates 
 * 
 * @param custGroupId 
 */
export const updateRelatedToCustGroup = async (
  record: Partial<ICustgroups>,
  custGroupId: string | string[],
) => {
  if (!custGroupId) throw new Error('エラーが発生しました。custGroupIdは定義されていません。');

  /* custGroup 1-n projects */
  const updatedProjects = await updateRelated<ProjectDetails.SavedData>({
    relatedAppId: APPIDS.project,
    recIds: custGroupId,
    lookUpFieldName: 'custGroupId',
    record: {
      custGroup: {
        type: 'SUBTABLE',
        value: record.members?.value.map(({
          id,
          value: {
            customerId,
          },
        }) => {
          return {
            id,
            value: {
              custId: customerId,
              custName: { value: 'auto' },
              custNameReading: { value: 'auto' },
            },
          };
        }) || [],
      },
      custGroupAgents: {
        type: 'SUBTABLE',
        value: record.agents?.value.map(({
          id,
          value: {
            employeeId,
            employeeName,
            agentType,
          },
        }) => {
          return {
            id,
            value: {
              custAgentId: employeeId,
              custAgentName: employeeName,
              custAgentType: agentType,
            },
          };
        }) || [],
      },
    },
  });


  /* projects 1-n projEstimates */
  const projIds = updatedProjects.results.map(({ id }) => id );
  const updatedProjEstimates = await updateRelated<Estimates.main.SavedData>({
    relatedAppId: APPIDS.projectEstimate,
    recIds: projIds,
    lookUpFieldName: 'projId',
  });

  return {
    [APPIDS.project]: updatedProjects,
    [APPIDS.projectEstimate] : updatedProjEstimates,
  };

};
