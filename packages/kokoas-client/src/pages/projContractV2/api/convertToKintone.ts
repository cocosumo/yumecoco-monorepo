import { toKintoneDateStr } from 'kokoas-client/src/lib';
import { IContracts } from 'types';
import { TypeOfForm } from '../schema';

export const convertToKintone = ({

  projId,
  totalContractAmt,
  totalProfit,

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
    totalProfit: { value: totalProfit.toString() },

    contractAmt: { value: (hasContractAmt ? contractAmt : 0).toString() },
    contractAmtDate: { value: (hasContractAmt ? toKintoneDateStr(contractAmtDate) : '') },

    initialAmt: { value: (hasInitialAmt ? initialAmt : 0).toString() },
    initialAmtDate: { value: (hasInitialAmt ? toKintoneDateStr(initialAmtDate) : '') },

    interimAmt: { value: (hasInterimAmt ? interimAmt : 0).toString() },
    interimAmtDate: { value: (hasInterimAmt ? toKintoneDateStr(interimAmtDate) : '') },

    finalAmt: { value: (hasFinalAmt ? finalAmt : 0).toString() },
    finalAmtDate: { value: (hasFinalAmt ? toKintoneDateStr(finalAmtDate) : '') },

    hasRefund: { value: hasRefund ? 'はい' : 'いいえ' },
    refundAmt: { value: (hasRefund ? refundAmt : 0).toString() },

    hasSubsidy: { value: hasSubsidy ? 'はい' : 'いいえ' },
    subsidyAmt: { value: (hasSubsidy ? subsidyAmt : 0).toString() },
    subsidyMethod: { value: subsidyMethod },

    payMethod: { value: payMethod },
    payDestination: { value: payDestination ?? '' },

    startDate: { value: toKintoneDateStr(startDate) },
    startDaysAfterContract: { value: startDaysAfterContractDate?.toString() ?? '' },

    finishDate: { value: toKintoneDateStr(finishDate) },
    finishDaysAfterContract: { value: finishDaysAfterContractDate?.toString() ?? '' },

    deliveryDate: { value: toKintoneDateStr(deliveryDate) },
    contractDate: { value: toKintoneDateStr(contractDate) },
    
  };

  return kintoneRecord;
};