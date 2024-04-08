import { IContracts, IEmployees, IProjects, IUnissuedinvoicealert } from 'types';
import { summarizeContracts } from './summarizeContracts';
import { getNotificationSettings } from './getNotificationSettings';
import format from 'date-fns/format';
import addWeeks from 'date-fns/addWeeks';
import { KAlertPurpose, alertPurposes } from '../alertConfig';
import { getDisplayPaymentDate } from '../helper/getDisplayPaymentDate';



const getAgentNames = (agents: IProjects['agents'], affiliation: string) => {
  return agents.value.filter(({ value: {
    agentName,
    agentType,
  } }) => agentName.value !== '' && agentType.value === affiliation)
    .map(({ value: { agentName } }) => agentName.value)
    .join(', ');
};



export const convertToKintone = ({
  recProj,
  recContracts,
  recEmployees,
  purpose,
  paymentDate,
  paymentAmount,
}: {
  recProj: IProjects
  recContracts: IContracts[]
  recEmployees: IEmployees[]
  purpose: KAlertPurpose
  paymentDate: Date | null
  paymentAmount: string
}) => {

  const {
    projName,
    andpadSystemId,
    forceLinkedAndpadSystemId,
    uuid,
    store,
    projTypeName,
    agents,
    territory,
  } = recProj;

  const systemId = andpadSystemId.value || forceLinkedAndpadSystemId.value || '';

  const andpadInvoiceUrl = systemId ?
    `https://andpad.jp/manager/my/orders/${systemId}/customer_agreement`
    : null;

  const {
    mainContractDate,
    contractIds,
    earliestDate,
    totalContractAmt,
  } = summarizeContracts({ contracts: recContracts });

  const notificationSettings = getNotificationSettings({
    agents,
    recEmployees,
  });

  const plannedDepositDate = getDisplayPaymentDate(paymentDate, 'yyyy-MM-dd');

  const kintoneRecord: Partial<IUnissuedinvoicealert> = {
    // recProj
    projName: { value: projName.value },
    systemId: { value: systemId },
    andpadUrl: { value: andpadInvoiceUrl || '' },
    projId: { value: uuid.value },
    store: { value: store.value },
    projType: { value: projTypeName.value },
    yumeAG: { value: getAgentNames(agents, 'yumeAG') },
    area: { value: territory.value },
    cocoAGs: { value: getAgentNames(agents, 'cocoAG') },

    // contractsSummary
    contractId: { value: contractIds },
    totalContractAmount: { value: String(totalContractAmt) },
    contractDate: { value: mainContractDate },
    expectedPaymentDate: { value: earliestDate },

    // recEmployees
    notificationSettings: notificationSettings,

    // アラート用設定
    alertState: { value: '1' },
    expectedCreateInvoiceDate: { value: earliestDate },
    scheduledAlertDate: { value: format(addWeeks(new Date(), 1), 'yyyy-MM-dd') },
    lastAlertDate: { value: format(new Date(), 'yyyy-MM-dd') },
    alertType: { value: alertPurposes[purpose] },

    paymentDate: { value: plannedDepositDate },
    paymentAmount: { value: paymentAmount },
  };

  return kintoneRecord;
};
