import { parseISO } from 'date-fns';
import { calculateRowAmount, formatDataId, roundTo } from 'libs';
import { IProjestimates } from 'types';
import { TunitChoices } from '../validationSchema';
import { TForm } from '../schema';
import { initialRow } from '../form';

export const convertEstimateToForm = (
  recEstimate: IProjestimates,
) : Partial<TForm> => {

  const {
    uuid,
    projId,
    内訳: { value: estimateTable },
    顧客名 : custName,
    工事種別利益: projTypeProfit,
    税: tax,
    estimateStatus,
    projTypeId,
    作成日時,
    dataId,
    $revision,
    remarks,
  } = recEstimate;

 

  const parsedTaxRate = +tax.value / 100;

  /* 内訳 */
  const newItems : TForm['items'] = estimateTable
    .map(({
      id: itemId, 
      value: row, 
    }) => {
      const {
        原価,
        大項目,
        中項目,
        部材名,
        数量,
        単位,
        税率,
        単価,
        備考,
        部材備考,
      } = row;

      const isTaxable = +(税率.value) > 0;

      const {
        costPrice,
        profitRate,
        rowCostPrice,
        rowUnitPriceBeforeTax,
        rowUnitPriceAfterTax,
      } = calculateRowAmount({
        costPrice: +原価.value,
        quantity: +数量.value || 1, //　K324 evaluate 0 to 1 to preserved　粗利 and　単価 
        taxRate: parsedTaxRate,
        unitPrice: +単価.value,
      });

      // On empty row, adopt project type's profit rate.
      let resolveRowProfitRate = roundTo(profitRate * 100, 2);
      if (!rowUnitPriceAfterTax && !profitRate) {
        resolveRowProfitRate = roundTo(+projTypeProfit.value, 2);
      }

      return {
        ...initialRow,
        itemId: String(itemId),
        costPrice,
        quantity: +数量.value,
        rowCostPrice,
        majorItem: 大項目.value,
        middleItem: 中項目.value,
        material: 部材名.value,
        materialDetails: 部材備考.value,
        rowDetails: 備考.value,
        materialProfRate: resolveRowProfitRate,
        unit: (単位.value || '式') as TunitChoices,
        unitPrice: +単価.value,
        rowUnitPriceBeforeTax: rowUnitPriceBeforeTax,
        rowUnitPriceAfterTax,
        taxable: isTaxable,

      };
    });

  /* フォーム */
  return {
    estimateId: uuid.value,
    estimateDataId: formatDataId(dataId.value),
    customerName: custName.value,
    projId: projId.value,
    projTypeProfit : +projTypeProfit.value,
    projTypeId : projTypeId.value,
    taxRate : +tax.value,
    status : estimateStatus.value as TForm['status'],
    createdDate : parseISO(作成日時.value),
    items: newItems,
    estimateRevision: $revision.value,
    remarks: remarks?.value || '',
  };

};