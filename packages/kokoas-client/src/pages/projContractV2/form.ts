import { TypeOfForm } from './schema';

export const initialForm : TypeOfForm = {
  projId: '',
  projName: '',

  contractId: '',

  totalContractAmt: 0,
  projectCost: 0,
  
  hasContractAmt: false,
  contractAmt: null,
  contractAmtDate: null,
  
  hasStartAmt: false,
  startAmt: null,
  startAmtDate: null,

  hasInterimAmt: false,
  interimAmt: null,
  interimAmtDate: null,

  hasFinalAmt: false,
  finalAmt: null,
  finalAmtDate: null,
  
  hasRefund: false,
  refundAmt: null,

  hasSubsidy: false,
  subsidyAmt: null,
  subsidyType: '顧客に返金',
  
  payMethod: '振込',
  payDestination: '豊田信用金庫　朝日支店',

  startDate: null,
  startDaysAfterContractDate: null,
  finishDate: null,
  finishDaysAfterContractDate: null,

  deliveryDate: null,
  contractDate: new Date(),
  
};


export type KeyOfForm = keyof TypeOfForm;
