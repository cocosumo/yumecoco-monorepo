import { TypeOfForm } from './schema';

export const initialForm : TypeOfForm = {
  projEstimateId: '',
  custGroupId: '',
  projId: '',
  projName: '',

  contractId: undefined,
  
  totalContractAmtAfterTax: 0,
  totalContractAmtBeforeTax: 0, 
  totalProfit: 0,
  profitRate: 0,
  taxRate: 0.1,
  costPrice: 0,
  
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

  hasOthersAmt: false,
  othersAmt: 0,
  othersAmtDate: null,
  
  hasRefund: false,
  refundAmt: 0,

  hasSubsidy: false,
  subsidyAmt: 0,
  subsidyMethod: '顧客に返金',
  
  payMethod: '振込',
  payDestination: '豊田信用金庫　朝日支店',

  startDate: null,
  startDaysAfterContractDate: 0,
  finishDate: null,
  finishDaysAfterContractDate: 0,

  deliveryDate: null,
  contractDate: new Date(),
  
  envelopeStatus: '',
  envelopeId: '',
  signMethod: 'electronic',
};


export type KeyOfForm = keyof TypeOfForm;
