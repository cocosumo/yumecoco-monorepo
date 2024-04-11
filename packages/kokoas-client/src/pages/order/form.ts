import { TForm } from './schema';

export const initialValues : TForm = {
  projId: '',
  projName: '',
  storeName: '',
  revision: '',
  items: [
    {
      selected: false,
      itemId: '',
      status: '',
      majorItem: '',
      middleItem: '',
      material: '',
      supplierName: '',
      orderId: '',
      quantity: 0,
      unit: '式',
      costPrice: 0,
      rowCostPriceBeforeTax: 0,
      taxRate: 0.1, // default 10%
      rowRemarks: '',
    },
  ],
};  


export const initialRow = initialValues.items[0];