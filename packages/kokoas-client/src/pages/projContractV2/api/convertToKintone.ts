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
  subsidyType,

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
    
  };

  return kintoneRecord;
};