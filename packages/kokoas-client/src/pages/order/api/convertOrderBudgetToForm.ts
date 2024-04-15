import { IOrderbudget, IProjects } from 'types';
import { TForm } from '../schema';
import { initialRow } from '../form';

export const convertOrderBudgetToForm = ({
  orderBudget,
  project,
}:{
  orderBudget: IOrderbudget,
  project: IProjects,
}): TForm => {

  const {
    uuid: projId,
    items,
    $revision: revision,
  } = orderBudget;

  const {
    projName,
    store,
  } = project;


  return {
    projId: projId.value || '',
    projName: projName.value || '',
    revision: revision.value,
    storeName: store.value || '',
    items: items.value.map(({ id, value: row }) => ({
      selected: false,
      itemId: id,
      status: row.status.value,
      majorItem: row.majorItem.value,
      middleItem: row.middleItem.value,
      material: row.material.value,
      supplierName: row.supplierName.value,
      orderId: row.orderId.value,
      quantity: Number(row.quantity.value),
      unit: row.unit.value || initialRow.unit,
      costPrice: Number(row.costPrice.value),
      rowCostPriceBeforeTax: Number(row.orderAmountBeforeTax.value),
      taxRate: Number(row.taxRate.value),
      rowRemarks: row.rowRemarks.value,
    })),
  };
};