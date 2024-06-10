import { TForm } from './schema';

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
  invoiceDetails: [
    {
      invoiceItem: '',
      billingAmount: 0,
    },
  ],
  remarks: '',
};
