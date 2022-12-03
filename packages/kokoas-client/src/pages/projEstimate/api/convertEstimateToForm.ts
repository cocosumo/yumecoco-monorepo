import { calculateEstimateRow } from 'api-kintone/src/estimates/calculation/calculateEstimateRow';
import { format, parseISO } from 'date-fns';
import { IProjestimates, TaxType } from 'types';
import { TypeOfForm } from '../form';

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
    items: estimateTable.map(({ id, value: row }) => {

      const {
        原価,
        大項目,
        中項目,
        部材名,
        数量,
        単位,
        taxType,
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
        element: 部材名.value,
        elemProfRate: profitRate * 100,
        unit: 単位.value as TypeOfForm['items'][number]['unit'],
        unitPrice,
        rowUnitPriceAfterTax: +rowUnitPriceAfterTax.value,
        taxType: taxType.value as TypeOfForm['items'][number]['taxType'],
      };
    }),
  };

};