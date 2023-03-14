import { Big } from 'big.js';
import { parseISO } from 'date-fns';
import { InvoiceSummary } from 'kokoas-client/src/hooksQuery';
import { TInvoiceStatus, TMaterials, TypeOfForm } from '../form';

export const convertInvoiceToForm = (
  recInvoice: DBInvoices.SavedData,
  estimates: TMaterials[],
  datInvoicesSummary: InvoiceSummary[],
  estimateIdArray: string[],
): Partial<TypeOfForm> => {
  const {
    uuid,
    custGroupId,
    estimateLists,
    plannedPaymentDate,
    exceedChecked,
    invoiceStatus,
  } = recInvoice;


  const newEstimates: TMaterials[] = estimates.reduce((
    acc,
    {
      // estimateIndex, ※この時点では設定されていないため、使用しない
      projId,
      projTypeName,
      dataId,
      contractAmount,
      nonTaxableAmount,
      // billedAmount,
      // billingAmount,
      amountType,
      // isForPayment,
      estimateId,
    },
    idx) => {

    // 請求書内にdataIdが存在するものは、請求書に使用している
    const tgtBillingAmount = estimateLists.value.find(({ value }) => {
      return (value.dataId.value === dataId);
    })?.value.amountPerContract.value ?? '0';

    const invoiceSummary = datInvoicesSummary?.find(({ dataId: dataIdOfInvoice }) => {
      return dataIdOfInvoice === dataId;
    });

    const invoiceStatusVal = invoiceStatus.value as TInvoiceStatus;
    const isBilled = invoiceStatusVal === 'completed' || invoiceStatusVal === 'sent';
    const tgtBilledAmount = isBilled
      ? Big(invoiceSummary?.billedAmount ?? 0).minus(tgtBillingAmount)
        .toNumber()
      : (invoiceSummary?.billedAmount ?? 0);
    const tgtCreatedAmount = isBilled
      ? Big(invoiceSummary?.createdAmount ?? 0).minus(tgtBillingAmount)
        .toNumber()
      : (invoiceSummary?.createdAmount ?? 0);

    const isForPaymentFromURL = estimateIdArray.some((id) => id === estimateId);

    acc.push({
      estimateIndex: String(idx),
      projId: projId,
      projTypeName: projTypeName,
      dataId: dataId,
      contractAmount: Number(contractAmount),
      nonTaxableAmount: nonTaxableAmount,
      billedAmount: tgtBilledAmount,
      createdAmount: tgtCreatedAmount,
      billingAmount: Number(tgtBillingAmount),
      amountType: amountType,
      isForPayment: tgtBillingAmount !== '0' || isForPaymentFromURL,
      estimateId: estimateId,
    });

    return acc;
  }, [] as TMaterials[]);


  return {
    invoiceId: uuid.value,
    custGroupId: custGroupId.value,
    plannedPaymentDate: plannedPaymentDate.value ? parseISO(plannedPaymentDate.value) : '',
    undecidedPaymentDate: !plannedPaymentDate.value,
    exceedChecked: Boolean(exceedChecked.value),
    estimates: newEstimates,
    invoiceStatus: invoiceStatus.value as TInvoiceStatus,
  };

};