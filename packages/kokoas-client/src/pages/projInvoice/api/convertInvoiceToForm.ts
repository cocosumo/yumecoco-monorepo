import { TypeOfForm } from '../form';



export const convertInvoiceToForm = (
  recInvoice: DBInvoices.SavedData,
): Partial<TypeOfForm> => {
  const {
    uuid,
    custGroupId,
    billingAmount,
    estimateLists,
    plannedPaymentDate,
    exceedChecked,
  } = recInvoice;

  return {
    invoiceId: uuid.value,
    custGroupId: custGroupId.value,
    plannedPaymentDate: plannedPaymentDate.value,
    exceedChecked: !exceedChecked.value ? false : true,
  };

};