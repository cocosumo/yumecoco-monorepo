import { IContracts, IInvoiceb2c, IProjects } from 'types';
import { TForm } from '../schema';
import { Big } from 'big.js';
import { initInvDetailsValue } from '../form';



export const convertInvoiceToForm = ({
  invoiceRec,
  projectRec,
  contractRec,
  invoiceId,
}: {
  invoiceRec: IInvoiceb2c[]
  projectRec: IProjects
  contractRec: IContracts[]
  invoiceId: string | undefined
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



  const tgtInvRec = (() => {
    if (!invoiceId) return {} as IInvoiceb2c;
    invoiceRec.find(({ uuid: invRecId }) => invRecId.value === invoiceId);
  })();

  const invoiceDetails = (() => {
    if (!tgtInvRec) return [initInvDetailsValue];

    return tgtInvRec?.invoiceDetails?.value.map(({
      value: {
        billingAmountAfterTax,
        invoiceItem,
      },
    }) => {
      return ({
        invoiceItem: invoiceItem.value,
        billingAmount: +billingAmountAfterTax.value,
      });
    }) || [initInvDetailsValue];
  })();

  const billedAmount = invoiceRec.reduce((acc, {
    invoiceDetails: {
      value: invDetailsVal,
    },
  }) => {
    let amount = 0;
    for (let i = 0; i < invDetailsVal.length; i++) {
      amount += +invDetailsVal[i].value.billingAmountAfterTax.value;
    }

    return acc + amount;
  }, 0);


  return {
    invoiceId: tgtInvRec?.uuid?.value || '',
    invoiceStatus: tgtInvRec?.invoiceStatus?.value || '',
    invoiceDataId: tgtInvRec?.invoiceDataId?.value || '',
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
    billedAmount: billedAmount,
    billingAmount: 0,
    billingTotalAmount: billedAmount,
    invoiceIssueDate: null,
    scheduledPayDate: null,
    payMethodPlan: tgtInvRec?.payMethodPlan?.value || '',
    remarks: tgtInvRec?.remarks?.value || '',

    invoiceDetails: invoiceDetails,
  };
};
