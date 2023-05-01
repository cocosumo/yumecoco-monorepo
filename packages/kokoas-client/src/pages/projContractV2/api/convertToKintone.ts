import { IContracts } from 'types';
import { TypeOfForm } from '../schema';

export const convertToKintone = ({

  projId,
  totalContractAmt,
  projectCost,

  hasContractAmt,
  contractAmt,
  contractAmtDate,
  
  hasInitialAmt,
  initialAmt,
  initialAmtDate,

  hasInterimAmt,
  interimAmt,
  interimAmtDate,

  hasFinalAmt,
  finalAmt,
  finalAmtDate,

  hasRefund,
  refundAmt,

  hasSubsidy,
  subsidyAmt,
  subsidyMethod,

  payMethod,
  payDestination,

  startDate,
  startDaysAfterContractDate,

  finishDate,
  finishDaysAfterContractDate,

  deliveryDate,
  contractDate,


}: TypeOfForm) => {

  const kintoneRecord: Partial<IContracts> = {
    projId: { value: projId },
    totalContractAmt: { value: totalContractAmt.toString() },
    projectCost: { value: projectCost.toString() },

    contractAmt: { value: (hasContractAmt ? contractAmt : 0).toString() },
    contractAmtDate: { value: (hasContractAmt ? contractAmtDate?.toISOString() ?? '' : '') },

    initialAmt: { value: (hasInitialAmt ? initialAmt : 0).toString() },
    initialAmtDate: { value: (hasInitialAmt ? initialAmtDate?.toISOString() ?? '' : '') },

    interimAmt: { value: (hasInterimAmt ? interimAmt : 0).toString() },
    interimAmtDate: { value: (hasInterimAmt ? interimAmtDate?.toISOString() ?? '' : '') },

    finalAmt: { value: (hasFinalAmt ? finalAmt : 0).toString() },
    finalAmtDate: { value: (hasFinalAmt ? finalAmtDate?.toISOString() ?? '' : '') },

    hasRefund: { value: hasRefund ? 'はい' : 'いいえ' },
    refundAmt: { value: (hasRefund ? refundAmt : 0).toString() },

    hasSubsidy: { value: hasSubsidy ? 'はい' : 'いいえ' },
    subsidyAmt: { value: (hasSubsidy ? subsidyAmt : 0).toString() },
    subsidyMethod: { value: (hasSubsidy ? payMethod : '') },
    
  };

  return kintoneRecord;
};