import { Big } from 'big.js';
import { parseISO } from 'date-fns';
import { EstimateList } from 'kokoas-client/src/hooksQuery';
import { TMaterials, TypeOfForm } from '../form';

export const convertInvoiceToForm = (
  recInvoice: DBInvoices.SavedData,
  estimates: TMaterials[],
  datInvoicesTotal: EstimateList[],
): Partial<TypeOfForm> => {
  const {
    uuid,
    custGroupId,
    estimateLists,
    plannedPaymentDate,
    exceedChecked,
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

    const tgtBilledAmount = datInvoicesTotal?.find(({ dataId: dataIdOfInvoice }) => {
      return dataIdOfInvoice === dataId;
    })?.billedAmount ?? '0';

    acc.push({
      estimateIndex: String(idx),
      projId: projId,
      projTypeName: projTypeName,
      dataId: dataId,
      contractAmount: Number(contractAmount),
      nonTaxableAmount: nonTaxableAmount,
      billedAmount: Number(Big(tgtBilledAmount).minus(tgtBillingAmount)),
      billingAmount: Number(tgtBillingAmount),
      amountType: amountType,
      isForPayment: tgtBillingAmount === '0' ? false : true,
      estimateId: estimateId,
    });

    return acc;
  }, [] as TMaterials[]);


  return {
    invoiceId: uuid.value,
    custGroupId: custGroupId.value,
    plannedPaymentDate: !(plannedPaymentDate.value) ? '' : String(parseISO(plannedPaymentDate.value)),
    undecidedPaymentDate: !(plannedPaymentDate.value) ? true : false,
    exceedChecked: Boolean(exceedChecked.value),
    estimates: newEstimates,
  };

};