import { Big } from 'big.js';
import { parseISO } from 'date-fns';
import { InvoiceSummary } from 'kokoas-client/src/hooksQuery';
import { TInvoiceStatus, TMaterials, TypeOfForm } from '../form';

export const convertInvoiceToForm = (
  recInvoice: DBInvoices.SavedData,
  estimates: TMaterials[],
  datInvoicesSummary: InvoiceSummary[],
): Partial<TypeOfForm> => {

  const {
    uuid,
    custGroupId,
    estimateLists,
    plannedPaymentDate,
    exceedChecked,
    invoiceStatus,
  } = recInvoice;


  const newEstimates: TMaterials[] = estimateLists.value.reduce((
    acc,
    { value },
    idx,
  ) => {

    const {
      amountPerContract,
      dataId: dataIdByInvoice,
      estimateId,
      paymentType,
      projId,
      projTypeName,
    } = value;

    // 契約内容から、契約金額と非課税金額を取り出す
    const contractInfo = estimates.find(({ dataId: dataIdByEstimate }) => {
      return dataIdByEstimate === dataIdByInvoice.value;
    });
    const contractAmount = contractInfo?.contractAmount;
    const nonTaxableAmount = contractInfo?.nonTaxableAmount;

    // 請求概要から、契約済み金額・作成済み金額を取り出す
    const invoiceSummary = datInvoicesSummary?.find(({ dataId: dataIdByInvSummary }) => {
      return dataIdByInvSummary === dataIdByInvoice.value;
    });
    const invoiceStatusVal = invoiceStatus.value as TInvoiceStatus;
    const isBilled = invoiceStatusVal === 'completed' || invoiceStatusVal === 'sent';
    const tgtBilledAmount = isBilled
      ? Big(invoiceSummary?.billedAmount ?? 0).minus(amountPerContract.value)
        .toNumber()
      : (invoiceSummary?.billedAmount ?? 0);
    const tgtCreatedAmount = isBilled
      ? Big(invoiceSummary?.createdAmount ?? 0).minus(amountPerContract.value)
        .toNumber()
      : (invoiceSummary?.createdAmount ?? 0);

    acc.push({
      estimateIndex: String(idx),
      projId: projId.value,
      projTypeName: projTypeName.value,
      dataId: dataIdByInvoice.value,
      contractAmount: Number(contractAmount),
      nonTaxableAmount: Number(nonTaxableAmount),
      billedAmount: tgtBilledAmount,
      createdAmount: tgtCreatedAmount,
      billingAmount: Number(amountPerContract.value),
      amountType: paymentType.value,
      isForPayment: true,
      estimateId: estimateId.value,
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