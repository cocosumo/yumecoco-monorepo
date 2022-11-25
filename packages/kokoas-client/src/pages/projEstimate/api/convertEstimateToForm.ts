import { format, parseISO } from 'date-fns';
import { IProjestimates } from 'types';
import { TypeOfForm } from '../form';

export const convertEstimateToForm = (
  recEstimate: IProjestimates,
) : Partial<TypeOfForm> => {

  const {
    projId,
    内訳: { value: estimateTable },
    顧客名 : custName,
    工事種別利益: projTypeProfit,
    税: tax,
    estimateStatus,
    projTypeId,
    作成日時,
    envStatus,
  } = recEstimate;

  return {
    customerName: custName.value,
    projId: projId.value,
    projTypeProfit : +projTypeProfit.value,
    projTypeId : projTypeId.value,
    tax : +tax.value,
    status : estimateStatus.value as TypeOfForm['status'],
    createdDate : format(parseISO(作成日時.value), 'yyyy/MM/dd'),
    envStatus : envStatus.value,
    items: estimateTable.map(({ id, value: {
      原価,
      大項目,
      中項目,
      部材名,
      数量,
      単位,
      部材利益率,
      taxType,
    } }) => {
      return {
        key: id,
        majorItem: 大項目.value,
        middleItem: 中項目.value,
        element: 部材名.value,
        quantity: +数量.value,
        unit: 単位.value as TypeOfForm['items'][number]['unit'],
        costPrice: +原価.value,
        elemProfRate: +部材利益率.value,
        taxType: taxType.value as TypeOfForm['items'][number]['taxType'],
      };
    }),
  };

};