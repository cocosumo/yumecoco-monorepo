import { TMaterials } from '../form';
import { InvoiceSummary } from 'kokoas-client/src/hooksQuery';
import { calculateEstimateRecord } from 'api-kintone';

type ConvertContructsToFormProps = {
  recContracts: DBProjestimates.SavedData[] | undefined
  calculated: ReturnType<typeof calculateEstimateRecord>[] | undefined
  recInvoice:  DBInvoices.SavedData | undefined
  datInvoicesSummary: InvoiceSummary[] | undefined
};

/**
 * 請求書(見積もり)のレコードを、formと同様の形式(TMariteals)に落とし込みます
 * 契約一覧表を表示するための前処理で、form形式である必要はありませんが、
 * 必要な情報で構成されているため、form形式に変換することとします
 * @returns 
 */
export const convertContructsToForm: ({
  recContracts = [],
  calculated,
  recInvoice,
  datInvoicesSummary = [],
}: ConvertContructsToFormProps) => TMaterials[] = ({
  recContracts = [],
  calculated,
  recInvoice,
  datInvoicesSummary = [],
}: ConvertContructsToFormProps) => {

  // 各契約書毎に、見積もり情報や請求情報を取り出す
  const newValues = recContracts.map((data, idx) => {

    // 見積もり枝番で請求書(サマリー)を紐づける -> billedAmount,createdAmountの取り出し
    const targetInvoiceSummary = datInvoicesSummary?.find(invoice => invoice.dataId === data.dataId.value);
    const {
      billedAmount = 0,
      createdAmount = 0,
    } = targetInvoiceSummary || {};

    // 見積もり枝番で請求書情報内のサブテーブルを紐づける　-> billingAmount, amountTypeを取り出し
    const invoiceDetails = recInvoice?.estimateLists.value.find(({ value }) => {
      return value.dataId.value === data.dataId.value;
    })?.value;

    return ({
      estimateIndex: String(idx),
      projId: data.projId.value,
      projTypeName: data.工事名称.value,
      dataId: data.dataId.value,
      contractAmount: Number(calculated?.[idx].summary.totalAmountAfterTax),
      nonTaxableAmount: Number(calculated?.[idx].summary.totalNonTaxableAmount),
      billedAmount: billedAmount,
      createdAmount: createdAmount,
      billingAmount: Number(invoiceDetails?.amountPerContract.value),
      amountType: invoiceDetails?.paymentType.value ?? '',
      isForPayment: false, // dummy
      estimateId: invoiceDetails?.estimateId.value ?? '',
    });
  });

  return newValues;
};