import { getCustGroupById } from 'api-kintone';
import { ICustmemos, TAgents } from 'types';
import { getUserCodesByIds } from '../../../../../../../api/kintone/users/GET';
import { MemoFormType } from '../form';

const getAgentIds = async (custGroupId: string, agentTypes: TAgents[] = [] ) => {

  const { agents } = await getCustGroupById(custGroupId);

  return agents.value
    .filter(item => agentTypes.includes(item.value.agentType.value as TAgents || agentTypes.length === 0))
    .map(item => item.value.employeeId.value);
};

export const formDataToKintone = async (params: MemoFormType) : Promise<Partial<ICustmemos>> => {
  const {  memoType, contents, custGroupId, isNotify, notifyTo } = params;

  const commonFields: Partial<ICustmemos> = {
    memoType: { value: memoType },
    contents: { value: contents },
    custGroupId: { value: custGroupId },
  };

  if (isNotify) {
    const agentIds = await getAgentIds(custGroupId, notifyTo);
    const agentUserCodes = await getUserCodesByIds(agentIds);
    return { ...commonFields, notifyTo: { value: agentUserCodes } };
  }



  return commonFields;
};
