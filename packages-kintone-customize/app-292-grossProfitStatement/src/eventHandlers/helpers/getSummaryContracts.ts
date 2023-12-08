import { Big } from 'big.js';
import { IAndpadprocurements, IContracts, IProjects, IProjtypes, TAgents } from 'types';

export interface SummaryContracts {
  storeName: string
  custName: string
  projType: string
  projTypeForTotalization: string
  yumeAgName: string[]
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
      return agentName.value;
    });
};

export const getSummaryContracts = ({
  projTypes,
  projects,
  contracts,
  andpadProcurement,
}: {
  projTypes: IProjtypes[]
  projects: IProjects[]
  contracts: IContracts[]
  andpadProcurement: IAndpadprocurements[]
}) => {

  const summaryContracts: SummaryContracts[] = projects.map(({
    store,
    custNames,
    projTypeId,
    agents,
    projFinDate,
    uuid: projId,
    andpadSystemId,
    forceLinkedAndpadSystemId,
  }) => {

    const projSystemId = andpadSystemId.value || forceLinkedAndpadSystemId.value || '';

    const filterContracts = contracts
      .filter(({ projId: projIdContract }) => projIdContract.value === projId.value);

    const {
      orderAmountAfterTax,
      hasRefund,
    } = filterContracts.reduce((acc, {
      totalContractAmt,
      hasRefund: hasRefundContracts,
    }) => {

      return {
        orderAmountAfterTax: acc.orderAmountAfterTax + +totalContractAmt.value,
        hasRefund: acc.hasRefund || hasRefundContracts.value === 'はい',
      };

    }, {
      orderAmountAfterTax: 0,
      hasRefund: false,
    });

    const orderAmountBeforeTax = Big(orderAmountAfterTax).div(1.1)
      .toNumber();

    const {
      label: projTypeName,
      projTypeForTotalization,
    } = projTypes.find(({ uuid }) => uuid.value === projTypeId.value) || {};


    const procurements = andpadProcurement.filter(({ andpadProjId }) => andpadProjId.value === projSystemId);
    const procurementBeforeTax = procurements.reduce((acc, {
      orderAmountBeforeTax: procurementAmt,
    }) => {
      return acc + +procurementAmt.value;
    }, 0);



    return {
      storeName: store.value,
      custName: custNames.value,
      projType: projTypeName?.value || '',
      projTypeForTotalization: projTypeForTotalization?.value || '',
      yumeAgName: getAgents({ agents: agents, relation: 'yumeAG' }),
      cocoAgs: getAgents({ agents: agents, relation: 'cocoAG' }),
      cocoConst: getAgents({ agents: agents, relation: 'cocoConst' }),
      refund: hasRefund,
      closingDate: projFinDate.value,
      orderAmountBeforeTax: orderAmountBeforeTax,
      grossProfitAmount: Big(orderAmountBeforeTax).minus(procurementBeforeTax)
        .toNumber(),
      introFeeYume: 0,
      selfProjSection: '', // 設定・確認方法を確認する
    };

  });

  return summaryContracts;
};
