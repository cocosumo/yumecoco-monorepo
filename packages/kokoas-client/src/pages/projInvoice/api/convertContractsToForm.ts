import { TMaterials } from '../form';
import { InvoiceSummary } from 'kokoas-client/src/hooksQuery';
import { calculateEstimateRecord } from 'api-kintone';

type ConvertContractsToFormProps = {
  recContracts: DBProjestimates.SavedData[] | undefined
  calculated: ReturnType<typeof calculateEstimateRecord>[] | undefined
  recInvoice: DBInvoices.SavedData | undefined
  datInvoicesSummary: InvoiceSummary[] | undefined
};

/**
 * 請求書(見積もり)のレコードを、formと同様の形式(TMariteals)に落とし込みます
 * 契約一覧表を表示するための前処理で、form形式である必要はありませんが、
 * 必要な情報で構成されているため、form形式に変換することとします
 * @returns 
 */
export const convertContractsToForm = ({
  recContracts = [],
  calculated,
  recInvoice,
  datInvoicesSummary = [],
}: ConvertContractsToFormProps): TMaterials[]=> {

  // 各契約書毎に、見積もり情報や請求情報を取り出す
  const newValues = recContracts.map((contract, idx) => {

    // 見積もり枝番で請求書(サマリー)を紐づける -> billedAmount,createdAmountの取り出し
    const targetInvoiceSummary = datInvoicesSummary?.find(invoice => invoice.dataId === contract.dataId.value);
    const {
      billedAmount = 0,
      createdAmount = 0,
    } = targetInvoiceSummary || {};

    // 見積もり枝番で請求書情報内のサブテーブルを紐づける　-> billingAmount, amountTypeを取り出し
    const invoiceDetails = recInvoice?.estimateLists.value.find(({ value }) => {
      return value.dataId.value === contract.dataId.value;
    })?.value;


    return ({
      estimateIndex: '', // 契約一覧表では使用しないため、空とします
      projId: contract.projId.value,
      projTypeName: contract.工事種別名.value,
      dataId: contract.dataId.value,
      contractAmount: Number(calculated?.[idx].summary.totalAmountAfterTax),
      nonTaxableAmount: Number(calculated?.[idx].summary.totalNonTaxableAmount),
      billedAmount: billedAmount,
      createdAmount: createdAmount,
      billingAmount: Number(invoiceDetails?.amountPerContract.value ?? ''),
      amountType: invoiceDetails?.paymentType.value ?? '',
      isShow: false,
      estimateId: contract.uuid.value,
    });
  });

  /* 見積もりを枝番号でソートする */
  return newValues.sort((a, b) => {
    return a.dataId < b.dataId ? -1 : 1;
  });
};