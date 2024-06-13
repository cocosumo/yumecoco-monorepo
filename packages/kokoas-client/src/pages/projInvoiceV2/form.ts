import { TForm, TInvoiceDetail } from './schema';


export const initInvDetailsValue: TInvoiceDetail = {
  invoiceItem: '',
  billingAmount: 0,
};

export const initialValues: TForm = {
  invoiceId: '',
  invoiceStatus: '',
  invoiceDataId: '',
  projId: '',
  contractIds: [],
  excludedPlanContracts: [],
  hasExcludedPlanContractAmt: false,
  custGroupId: '',
  projName: '',
  projDataId: '',
  storeName: '',
  personInCharge: '',
  totalContractAmtAfterTax: 0,
  totalContractAmtBeforeTax: 0,
  billingTotalAmount: 0,
  invoiceIssueDate: null,
  scheduledPayDate: null,
  payMethodPlan: '',
  invoiceDetails: [initInvDetailsValue],
  remarks: '',
};
