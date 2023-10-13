import { ICustgroups, IProjects } from 'types';
import { groupAgentsByType as projGroupAgentsByType } from 'api-kintone/src/projects/helpers/groupAgentsByType';
import { groupAgentsByType as custGroupAgentsByType } from 'api-kintone/src/custgroups/helpers/groupAgentsByType';


interface IAgent {
  empId: string;
  empName: string;
  empRole: string;
}

/** 
 * 古い工事データの場合、cocoAGはないので、
 * custGroupのagentのcocoAGを使う
 */
export const matchCocoAgentsById = ({
  empIdToMatch,
  projAgents,
  custAgents,
}: {
  empIdToMatch: string | undefined,
  projAgents: IProjects['agents'],
  custAgents: ICustgroups['agents'],
}) : IAgent | undefined => {
  const {
    cocoAG: projCocoAG,
  } = projGroupAgentsByType(projAgents);

  const {
    cocoAG: custGroupCocoAG,
  } = custGroupAgentsByType(custAgents);

  if (projCocoAG?.length) {
    const matchedProjAgent = projCocoAG.find(({ value: { agentId } }) => agentId.value === empIdToMatch);
    if (matchedProjAgent) {
      const { agentId, agentName, empRole } = matchedProjAgent.value;
      return {
        empId: agentId.value,
        empName: agentName.value,
        empRole: empRole.value,
      };
    }
  } else {
    const matchedCustAgent = custGroupCocoAG.find(({ value: { employeeId } }) => employeeId.value === empIdToMatch);
    if (matchedCustAgent) {
      const { employeeId, employeeName } = matchedCustAgent.value;
      return {
        empId: employeeId.value,
        empName: employeeName.value,
        empRole: '',
      };
    }
  }
};