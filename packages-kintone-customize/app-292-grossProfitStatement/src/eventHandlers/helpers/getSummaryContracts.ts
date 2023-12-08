import { getProjTypes } from 'api-kintone';
import { useMemo } from 'react';
import { IContracts, IProjects, TAgents } from 'types';

export interface SummaryContracts {
  storeName: string
  custName: string
  projType: string
  projTypeForTotalization: string
  yumeAgName: string
  cocoAgs: string[]
  cocoConst: string[]
  refund: boolean
  closingDate: string
  orderAmountBeforeTax: number
  grossProfitAmount: number
  introFeeYume: number
  selfProjSection: string
}


const getAgents = ({
  agents,
  relation,
}: {
  agents: IProjects['agents']
  relation: TAgents,
}) => {
  return agents.value
    .filter(({ value: { agentType } }) => agentType.value === relation)
    .map(({ value: { agentName } }) => {
      return agentName.value
    }).join(', ');
};

export const getSummaryContracts = ({
  projects,
  contracts,
}: {
  projects: IProjects[]
  contracts: IContracts[]
}) => {

  const projTypeRec = useMemo(() => {
    const projTypes = await getProjTypes()

    return projTypes;
  }, [])


  const summaryContracts: SummaryContracts[] = projects.map(({
    store,
    custNames,
    projTypeId,
    agents,
    projFinDate,
    uuid,
  }) => {

    const filterContracts = contracts.filter(({ projId }) => projId.value === uuid.value);
    const {
      orderAmountBeforeTax,
      hasRefund,
    } = filterContracts.reduce((acc, { 
      totalContractAmt,
      hasRefund,
     }) => {

      return {
        orderAmountBeforeTax: acc.orderAmountBeforeTax + +totalContractAmt.value,
        hasRefund: acc.hasRefund || hasRefund.value === 'はい',
      }

    }, {
      orderAmountBeforeTax: 0,
      hasRefund: false,
    })


    const {
      label: projTypeName,
      projTypeForTotalization,
    } = projTypeRec.find(({ uuid }) => uuid.value === projTypeId.value) || {}



    return {
      storeName: store.value,
      custName: custNames.value,
      projType: projTypeName?.value,
      projTypeForTotalization: projTypeForTotalization?.value,
      yumeAgName: getAgents({ agents: agents, relation: 'yumeAG' }),
      cocoAgs: getAgents({ agents: agents, relation: 'cocoAG' }),
      cocoConst: getAgents({ agents: agents, relation: 'cocoConst' }),
      refund: hasRefund,
      closingDate: projFinDate.value,
      orderAmountBeforeTax: orderAmountBeforeTax,
      grossProfitAmount: 'number',
      introFeeYume: 'number',
      selfProjSection: ,
    };

  });

  return summaryContracts;
};
