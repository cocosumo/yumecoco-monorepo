import { calculateEstimateRow } from 'api-kintone';
import { parseISO } from 'date-fns';
import { formatDataId, roundTo } from 'libs';
import { IProjestimates, TaxType } from 'types';
import { initialValues, TypeOfForm } from '../form';
import { TunitChoices } from '../validationSchema';
import { calculateSummary } from './calculateSummary';

export const convertEstimateToForm = (
  recEstimate: IProjestimates,
) : Partial<TypeOfForm> => {

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
    envStatus,
    dataId,
  } = recEstimate;

  /* 内訳 */
  const newItems : TypeOfForm['items'] = estimateTable.map(({ value: row }) => {
    const {
      原価,
      大項目,
      中項目,
      部材名,
      数量,
      単位,
      taxType,
      備考,
      部材備考,
      金額: rowUnitPriceAfterTax,
    } = row;

    const isTaxable = (taxType.value  as TaxType) === '課税';
    const parsedRowUnitPriceAfterTax = +rowUnitPriceAfterTax.value;

    const {
      costPrice,
      quantity,
      profitRate,
      unitPrice,
      rowCostPrice,
      rowUnitPriceBeforeTax,
    } = calculateEstimateRow({
      costPrice: +原価.value,
      quantity: +数量.value,
      taxRate: +tax.value / 100,
      rowUnitPriceAfterTax: parsedRowUnitPriceAfterTax,
      isTaxable,
    });

    // On empty row, adopt project type's profit rate.
    let resolveRowProfitRate = roundTo(profitRate * 100, 2);
    if (!parsedRowUnitPriceAfterTax && !profitRate) {
      resolveRowProfitRate = roundTo(+projTypeProfit.value, 2);
    }

    return {
      costPrice,
      quantity,
      rowCostPrice,
      majorItem: 大項目.value,
      middleItem: 中項目.value,
      material: 部材名.value,
      materialDetails: 部材備考.value,
      rowDetails: 備考.value,
      materialProfRate: resolveRowProfitRate,
      unit: (単位.value || '式') as TunitChoices,
      unitPrice: Math.round(unitPrice),
      rowUnitPriceBeforeTax: Math.round(rowUnitPriceBeforeTax),
      rowUnitPriceAfterTax: Math.round(parsedRowUnitPriceAfterTax),
      taxable: taxType.value === '課税' ? true : false,

    };
  });

  /*
    仮想行の追加
    useAdvancedTableRow listens to changes on the last row to insert a virtual row,
    but that makes the form "dirty".

    To keep "dirty" false on initial load, I added it here.
    This will need further refactoring as the user requirements become more stable.
  */
  if (!initialValues?.items?.[0]) throw new Error('!initialValues.items[0] is undefined');

  const {
    totalCostPrice,
    totalAmountAfterTax,
    totalAmountBeforeTax,
  } = calculateSummary(newItems);

  newItems.push({
    ...initialValues.items[0],
    materialProfRate: +projTypeProfit.value,
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
    status : estimateStatus.value as TypeOfForm['status'],
    createdDate : parseISO(作成日時.value),
    envStatus : envStatus.value,
    items: newItems,
    totalCostPrice,
    totalAmountBeforeTax,
    totalAmountAfterTax,
  };

};