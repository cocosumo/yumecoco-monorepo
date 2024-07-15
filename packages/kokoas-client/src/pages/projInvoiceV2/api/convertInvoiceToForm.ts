import { IContracts, IInvoiceb2c, IProjects } from 'types';
import { TForm, TInvoiceDetails } from '../schema';
import { Big } from 'big.js';
import { initInvDetailsValue } from '../form';
import { sortContracts } from '../helper/sortContracts';


// TODO: Need refactoring as variable names does not match the actual data.
export const convertInvoiceToForm = ({
  invoiceRec,
  projectRec,
  contractRec,
  invoiceId,
}: {
  invoiceRec: IInvoiceb2c[] | undefined
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
    custNames,
    agents,
  } = projectRec;
  const personInCharge = agents.value.find(({ value: { agentName, agentType } }) => {
    return (agentName.value !== '' && agentType.value === 'cocoAG');
  });

  const hasExcludedPlanContractAmt = contractRec.some(({ includePlanContractAmt, contractType }) =>
    (includePlanContractAmt.value === '1') && (contractType.value === '契約'));


  const sortedContracts = sortContracts(contractRec);

  const contractDatas = sortedContracts.reduce((acc, {
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
    invoiceRec?.find(({ uuid: invRecId }) => invRecId.value === invoiceId);
  })();

  const invoiceDetails: TInvoiceDetails = (() => {
    if (!tgtInvRec) return [initInvDetailsValue];

    return tgtInvRec?.invoiceDetails?.value.map(({
      id,
      value: {
        billingAmountAfterTax,
        invoiceItem,
      },
    }) => {
      return ({
        invoiceDetailId: id,
        invoiceItem: invoiceItem.value,
        billingAmount: +billingAmountAfterTax.value,
      });
    }) || [initInvDetailsValue];
  })();

  const billedAmount = invoiceRec?.reduce((acc, {
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
    invoice$Id: '',
    invoiceId: undefined,
    invoiceStatus: '新規作成',
    invoiceDataId: '',
    contractIds: contractDatas.validContracts,
    excludedPlanContracts: contractDatas.planContract,
    hasExcludedPlanContractAmt: hasExcludedPlanContractAmt,
    custGroupId: custGroupId.value,
    custName: custNames.value,
    projId: uuid.value,
    projName: projName.value || '',
    storeName: store.value || '',
    projDataId: dataId.value || '',
    personInCharge: personInCharge?.value.agentName.value || '',
    totalContractAmtAfterTax: contractDatas.totalContractAmt,
    totalContractAmtBeforeTax: totalContractAmtBFTax,
    billedAmount: billedAmount || 0,
    billingAmount: 0,
    billingTotalAmount: billedAmount || 0,
    invoiceIssueDate: null,
    scheduledPayDate: null,
    payMethodPlan: '',
    remarks: '',
    paymentStatus: '',

    invoiceDetails: invoiceDetails,
  };
};
