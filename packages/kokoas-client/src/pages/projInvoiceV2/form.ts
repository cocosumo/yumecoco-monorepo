import { TForm, TInvoiceDetail } from './schema';


export const initInvDetailsValue: TInvoiceDetail = {
  invoiceDetailId: '',
  invoiceItem: '',
  billingAmount: 0,
};

export const initialValues: TForm = {
  invoice$Id: '',
  invoiceId: undefined,
  invoiceStatus: '',
  invoiceDataId: '',
  projId: '',
  contractIds: [],
  excludedPlanContracts: [],
  hasExcludedPlanContractAmt: false,
  custGroupId: '',
  custName: '',
  projName: '',
  projDataId: '',
  storeName: '',
  personInCharge: '',
  totalContractAmtAfterTax: 0,
  totalContractAmtBeforeTax: 0,
  billedAmount: 0,
  billingAmount: 0,
  billingTotalAmount: 0,
  invoiceIssueDate: null,
  scheduledPayDate: null,
  payMethodPlan: '',
  invoiceDetails: [initInvDetailsValue],
  remarks: '',
  paymentStatus: '',
};
