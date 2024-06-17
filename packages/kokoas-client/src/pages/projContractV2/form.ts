import { TypeOfForm } from './schema';

export const initialForm : TypeOfForm = {
  projEstimateId: '',
  custGroupId: '',
  projId: '',
  projName: '',
  projTypeId: '',

  contractId: undefined,
  contractType: '契約',
  contractAddType: '追加工事',
  purpose: '専用住宅',
  structure: '木造（軸組み）',
  scale: '2階建て',
  projPeriod: 30,
  annotation: '建物面積により決定',

  includePlanContractAmt: false,
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
  refundMethod: '山豊工建',
  
  hasReduction: false,
  reductionAmt: 0,

  hasSubsidy: false,
  subsidyAmt: 0,
  //subsidyMethod: '顧客に返金',
  
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

  memo: '',
};


export type KeyOfForm = keyof TypeOfForm;
