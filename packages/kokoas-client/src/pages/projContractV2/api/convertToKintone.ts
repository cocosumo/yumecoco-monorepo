import { toKintoneDateStr } from 'kokoas-client/src/lib';
import { IContracts } from 'types';
import { TypeOfForm } from '../schema';

export const convertToKintone = ({

  projId,
  projEstimateId,

  contractType,
  contractAddType,
  purpose,
  structure,
  scale,
  projPeriod,
  annotation,

  includePlanContractAmt,
  totalContractAmtAfterTax,
  totalProfit,
  taxRate,

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

  hasOthersAmt,
  othersAmt,
  othersAmtDate,

  hasRefund,
  refundAmt,
  refundMethod,

  hasReduction,
  reductionAmt,

  hasSubsidy,
  subsidyAmt,
  //subsidyMethod,

  payMethod,
  payDestination,

  startDate,
  startDaysAfterContractDate,

  finishDate,
  finishDaysAfterContractDate,

  deliveryDate,
  contractDate,

  memo,

}: TypeOfForm) => {

  const isProjPlanContract = contractType === '設計契約';

  const kintoneRecord: Partial<IContracts> = {
    projId: { value: projId },
    projEstimateId: { value: projEstimateId },

    contractType: { value: contractType },
    contractAddType: { value: contractAddType || '' },

    includePlanContractAmt: { value: (+includePlanContractAmt).toString() },
    
    totalContractAmt: { value: totalContractAmtAfterTax.toString() },
    totalProfit: { value: totalProfit.toString() },
    tax: { value: taxRate.toString() },

    contractAmt: { value: (hasContractAmt ? contractAmt : 0).toString() },
    contractAmtDate: { value: (hasContractAmt ? toKintoneDateStr(contractAmtDate) : '') },

    purpose: { value: String(isProjPlanContract ? purpose : '') },
    structure: { value: String(isProjPlanContract ? structure : '') },
    scale: { value: String(isProjPlanContract ? scale : '') },
    projPeriod: { value: String(isProjPlanContract ? projPeriod : '') },
    annotation: { value: String(isProjPlanContract ? annotation : '') },

    initialAmt: { value: (hasInitialAmt ? initialAmt : 0).toString() },
    initialAmtDate: { value: (hasInitialAmt ? toKintoneDateStr(initialAmtDate) : '') },

    interimAmt: { value: (hasInterimAmt ? interimAmt : 0).toString() },
    interimAmtDate: { value: (hasInterimAmt ? toKintoneDateStr(interimAmtDate) : '') },

    finalAmt: { value: (hasFinalAmt ? finalAmt : 0).toString() },
    finalAmtDate: { value: (hasFinalAmt ? toKintoneDateStr(finalAmtDate) : '') },

    othersAmt: { value: (hasOthersAmt ? othersAmt : 0).toString() },
    othersAmtDate: { value: (hasOthersAmt ? toKintoneDateStr(othersAmtDate) : '') },

    hasRefund: { value: hasRefund ? 'はい' : 'いいえ' },
    refundAmt: { value: (hasRefund ? refundAmt : 0).toString() },
    refundMethod: { value: refundMethod || '' },

    hasReduction: { value: hasReduction ? 'はい' : 'いいえ' },
    reductionAmt: { value: (hasReduction ? reductionAmt : 0).toString() },

    hasSubsidy: { value: hasSubsidy ? 'はい' : 'いいえ' },
    subsidyAmt: { value: (hasSubsidy ? subsidyAmt : 0).toString() },
    //subsidyMethod: { value: subsidyMethod },

    payMethod: { value: payMethod },
    payDestination: { value: payDestination ?? '' },

    startDate: { value: toKintoneDateStr(startDate) },
    startDaysAfterContract: { value: startDaysAfterContractDate?.toString() ?? '' },

    finishDate: { value: toKintoneDateStr(finishDate) },
    finishDaysAfterContract: { value: finishDaysAfterContractDate?.toString() ?? '' },

    deliveryDate: { value: toKintoneDateStr(deliveryDate) },
    contractDate: { value: toKintoneDateStr(contractDate) },

    memo: { value: memo ?? '' },
    
  };

  return kintoneRecord;
};