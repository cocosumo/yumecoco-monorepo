import { TForm } from './schema';

export const initialValues : TForm = {
  projId: '',
  projName: '',
  revision: '',
  items: [
    {
      itemId: '',
      status: '',
      majorItem: '',
      middleItem: '',
      material: '',
      supplierName: '',
      orderId: '',
      quantity: 0,
      unit: '',
      costPrice: 0,
      rowCostPriceBeforeTax: 0,
      taxRate: 0.1, // default 10%
      rowCostPriceAfterTax: 0,
      rowRemarks: '',
    },
  ],
};  


export const initialRow = initialValues.items[0];