import { KAlertPurpose, alertPurposes } from '../alertConfig';
import { IContracts, IProjects, IUnissuedinvoicealert } from 'types';



export const summarizeMessageInfo = ({
  recProj,
  recReminders,
  recContracts,
  purpose,
}: {
  recProj: IProjects
  recReminders: IUnissuedinvoicealert[]
  recContracts: IContracts[]
  purpose: KAlertPurpose
}) => {

  const reminderId = recReminders.find(({
    alertType,
  }) => alertType.value === alertPurposes[purpose])
    ?.$id.value;

  const contractInfo = recContracts.reduce((acc, {
    includePlanContractAmt,
    totalContractAmt,
    contractDate: rawContractDate,
    contractType,
  }) => {
    // 契約日の設定
    if (contractType.value === '契約') {
      acc.contractDate = rawContractDate.value;
    } else if (contractType.value === '設計契約' && acc.contractDate === '') {
      acc.contractDate = rawContractDate.value;
    }

    // 合計契約金額の算出
    if (includePlanContractAmt.value !== '1') {
      acc.contractAmt += +totalContractAmt.value;
    }

    return acc;

  }, {
    contractDate: '',
    contractAmt: 0,
  });


  const agentNames = recProj.agents.value.reduce((acc, { value }) => {
    const {
      agentName,
      agentType,
    } = value;

    if (agentName.value !== '') {
      if (agentType.value === 'cocoAG') {
        acc.cocoAG.push(agentName.value);
      } else if (agentType.value === 'yumeAG') {
        acc.yumeAG.push(agentName.value);
      }
    }

    return acc;
  }, {
    cocoAG: [] as string[],
    yumeAG: [] as string[],
  });

  const reminderUrl = `https://rdmuhwtt6gx7.cybozu.com/k/303/show#record=${reminderId}&mode=edit`;


  return {
    contractDate: contractInfo.contractDate,
    contractAmt: contractInfo.contractAmt,
    cocoAGs: agentNames.cocoAG.join(', '),
    yumeAGs: agentNames.yumeAG.join(', '),
    reminderUrl: !reminderId ? undefined : reminderUrl,
  };
};