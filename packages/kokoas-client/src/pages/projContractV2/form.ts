import { TypeOfForm } from './schema';

export const initialForm : TypeOfForm = {
  custGroupId: '',
  projId: '',
  projName: '',

  contractId: undefined,

  totalContractAmt: 0,
  projectCost: 0,
  
  hasContractAmt: false,
  contractAmt: 0,
  contractAmtDate: null,
  
  hasInitialAmt: false,
  initialAmt: 0,
  initialAmtDate: null,

  hasInterimAmt: false,
  interimAmt: 0,
  interimAmtDate: null,

  hasFinalAmt: false,
  finalAmt: 0,
  finalAmtDate: null,
  
  hasRefund: false,
  refundAmt: 0,

  hasSubsidy: false,
  subsidyAmt: 0,
  subsidyMethod: '顧客に返金',
  
  payMethod: '振込',
  payDestination: '豊田信用金庫　朝日支店',

  startDate: null,
  startDaysAfterContractDate: null,
  finishDate: null,
  finishDaysAfterContractDate: null,

  deliveryDate: null,
  contractDate: new Date(),
  
  envelopeStatus: '',
  signMethod: 'electronic',
};


export type KeyOfForm = keyof TypeOfForm;
