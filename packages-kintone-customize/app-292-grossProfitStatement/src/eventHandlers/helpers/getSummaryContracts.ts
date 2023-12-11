import { calcProfitability } from 'api-kintone/src/andpadProcurement/calculation/calcProfitability';
import { Big, roundDown } from 'big.js';
import { IAndpadprocurements, IContracts, IProjects, IProjtypes, TAgents, TEnvelopeStatus } from 'types';

export interface SummaryContracts {
  storeName: string
  custName: string
  projType: string

  /** 集計用の工事種別 */
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
    .filter(({ value: { 
      agentType,
      agentName,
    } }) => (agentType.value === relation) && (agentName.value !== ''))
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
    commissionRate,
  }) => {

    const projSystemId = andpadSystemId.value || forceLinkedAndpadSystemId.value || '';

    const filterContracts = contracts
      .filter(({
        projId: projIdContract,
        envelopeStatus,
      }) => (projIdContract.value === projId.value)
        && (envelopeStatus as unknown as TEnvelopeStatus === 'completed'));

    const {
      orderAmountAfterTax,
      hasRefund,
      tax,
      subsidyAmt,
    } = filterContracts.reduce((acc, {
      totalContractAmt,
      hasRefund: hasRefundContracts,
      tax: taxContract,
      contractType,
      hasSubsidy,
      subsidyAmt: subsidyAmtContract,
    }) => {

      return {
        orderAmountAfterTax: acc.orderAmountAfterTax + +totalContractAmt.value,
        hasRefund: acc.hasRefund || hasRefundContracts.value === 'はい',
        tax: contractType.value === '契約' ? +taxContract.value : acc.tax,
        subsidyAmt: hasSubsidy.value === 'はい' ? acc.subsidyAmt += +subsidyAmtContract.value : acc.subsidyAmt,
      };

    }, {
      orderAmountAfterTax: 0,
      hasRefund: false,
      tax: 0.1,
      subsidyAmt: 0,
    });

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


    const {
      orderAmountBeforeTax,
      実利益率,
      利益税抜_夢てつ,
    } = calcProfitability({
      orderAmountAfterTax: orderAmountAfterTax,
      additionalAmountAfterTax: 0, // 追加金額も契約金額に含めて処置
      purchaseAmount: procurementBeforeTax,
      paymentAmount: procurementBeforeTax, // 正しくは支払金額だが、粗利表表示が目的のため、発注金額を設定する
      depositAmount: orderAmountAfterTax,  // 正しくは入金金額だが、粗利表表示が目的のため、契約金額を設定する
      yumeCommFeeRate: +commissionRate.value,
      tax: tax,
      hasRefund: hasRefund,
      subsidyAmt: subsidyAmt,
    });

    // 夢てつ紹介料は1000円未満を切り捨てで計算する
    const introFeeYume = Big(利益税抜_夢てつ).round(undefined, roundDown)
      .toNumber();

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
      grossProfitAmount: 実利益率,
      introFeeYume: introFeeYume,
      selfProjSection: '', // 設定・確認方法を確認する
    };

  });

  return summaryContracts;
};
