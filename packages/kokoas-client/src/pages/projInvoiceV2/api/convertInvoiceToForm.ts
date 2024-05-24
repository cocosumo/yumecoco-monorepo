import { IContracts, IInvoiceb2c, IProjects } from 'types';
import { TForm } from '../schema';

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

  const contractIds = contractRec.map(({ uuid: contractId }) => contractId.value);

  const invoiceRec = {} as IInvoiceb2c;


  return {
    invoiceId: invoiceRec?.uuid.value || '',
    invoiceStatus: invoiceRec?.invoiceStatus.value || '',
    invoiceDataId: invoiceRec?.invoiceDataId.value || '',
    contractIds: contractIds,
    custGroupId: custGroupId.value,
    projId: uuid.value || '',
    projName: projName.value || '',
    storeName: store.value || '',
    projDataId: dataId.value || '',
    personInCharge: personInCharge?.value.agentName.value || '',
    totalContractAmtAfterTax: 0,
    totalContractAmtBeforeTax: 0,
    billingTotalAmount: 0,
    invoiceIssueDate: null,
    scheduledPayDate: null,
    payMethodPlan: invoiceRec?.payMethodPlan.value || '',
    remarks: invoiceRec?.remarks.value || '',

    invoiceDetails: invoiceRec.invoiceDetails.value.map(({
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
