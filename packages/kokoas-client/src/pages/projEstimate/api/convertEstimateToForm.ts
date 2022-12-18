import { calculateEstimateRow } from 'api-kintone';
import { format, parseISO } from 'date-fns';
import { roundTo } from 'libs';
import { IProjestimates, TaxType } from 'types';
import { initialValues, TypeOfForm } from '../form';

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
  const newItems : TypeOfForm['items'] = estimateTable.map(({ id, value: row }) => {
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
    const {
      costPrice,
      quantity,
      profitRate,
      unitPrice,
    } = calculateEstimateRow({
      costPrice: +原価.value,
      quantity: +数量.value,
      taxRate: +tax.value / 100,
      rowUnitPriceAfterTax: +rowUnitPriceAfterTax.value,
      isTaxable,
    });

    return {
      key: id,
      costPrice,
      quantity,
      majorItem: 大項目.value,
      middleItem: 中項目.value,
      material: 部材名.value,
      materialDetails: 部材備考.value,
      rowDetails: 備考.value,
      elemProfRate: roundTo(profitRate * 100, 2),
      unit: 単位.value as TypeOfForm['items'][number]['unit'],
      unitPrice: Math.round(unitPrice),
      rowUnitPriceAfterTax: Math.round(+rowUnitPriceAfterTax.value),
      taxType: taxType.value as TypeOfForm['items'][number]['taxType'],
    };
  });

  /* 
    仮想行の追加 
    useAdvancedTableRow listens to changes on the last row to insert a virtual row, 
    but that makes the form "dirty".

    To keep "dirty" false on initial load, I added it here.
    This will need further refactoring as the user requirements become more stable.
  */
  newItems.push({
    ...initialValues.items[0],
    elemProfRate: +projTypeProfit.value,
  });

  /* フォーム */
  return {
    estimateId: uuid.value,
    estimateDataId: dataId.value,
    customerName: custName.value,
    projId: projId.value,
    projTypeProfit : +projTypeProfit.value,
    projTypeId : projTypeId.value,
    tax : +tax.value,
    status : estimateStatus.value as TypeOfForm['status'],
    createdDate : format(parseISO(作成日時.value), 'yyyy/MM/dd'),
    envStatus : envStatus.value,
    items: newItems,
  };

};