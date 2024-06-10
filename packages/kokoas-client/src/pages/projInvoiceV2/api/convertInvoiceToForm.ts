import { IContracts, IInvoiceb2c, IProjects } from 'types';
import { TForm } from '../schema';
import Big from 'big.js';



export const convertInvoiceToForm = ({
  //invoiceRec,
  projectRec,
  contractRec,
}: {
  //invoiceRec: TInvoice,
  projectRec: IProjects,
  contractRec: IContracts[],
}): TForm => {

  const {
    projName,
    store,
    dataId,
    uuid,
    custGroupId,
    agents,
  } = projectRec;
  const personInCharge = agents.value.find(({ value: { agentName, agentType } }) => {
    return (agentName.value !== '' && agentType.value === 'cocoAG');
  });

  const hasExcludedPlanContractAmt = contractRec.some(({ includePlanContractAmt, contractType }) =>
    (includePlanContractAmt.value === '1') && (contractType.value === '契約'));

  const contractDatas = contractRec.reduce((acc, {
    contractType,
    uuid: contractId,
    totalContractAmt: contractAmt,
  }) => {
    if (hasExcludedPlanContractAmt && contractType.value === '設計契約') {
      acc.planContract.push(contractId.value);
      return acc;
    }

    acc.validContracts.push(contractId.value);
    acc.totalContractAmt = acc.totalContractAmt + +contractAmt.value;

    return acc;
  }, {
    validContracts: [] as string[],
    planContract: [] as string[],
    totalContractAmt: 0,
  });

  const totalContractAmtBFTax = Big(contractDatas.totalContractAmt).div(1.1)
    .round()
    .toNumber();


  const invoiceRec = {} as IInvoiceb2c;


  return {
    invoiceId: invoiceRec?.uuid?.value || '',
    invoiceStatus: invoiceRec?.invoiceStatus?.value || '',
    invoiceDataId: invoiceRec?.invoiceDataId?.value || '',
    contractIds: contractDatas.validContracts,
    excludedPlanContracts: contractDatas.planContract,
    hasExcludedPlanContractAmt: hasExcludedPlanContractAmt,
    custGroupId: custGroupId.value,
    projId: uuid.value || '',
    projName: projName.value || '',
    storeName: store.value || '',
    projDataId: dataId.value || '',
    personInCharge: personInCharge?.value.agentName.value || '',
    totalContractAmtAfterTax: contractDatas.totalContractAmt,
    totalContractAmtBeforeTax: totalContractAmtBFTax,
    billingTotalAmount: 0,
    invoiceIssueDate: null,
    scheduledPayDate: null,
    payMethodPlan: invoiceRec?.payMethodPlan?.value || '',
    remarks: invoiceRec?.remarks?.value || '',

    invoiceDetails: invoiceRec?.invoiceDetails?.value.map(({
      value: {
        billingAmountAfterTax,
        inovoiceItem,
      },
    }) => {
      return ({
        invoiceItem: inovoiceItem.value,
        billingAmount: +billingAmountAfterTax.value,
      });
    }),
  };
};
