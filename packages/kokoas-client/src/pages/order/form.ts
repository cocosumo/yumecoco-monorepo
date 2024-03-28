import { TForm } from './schema';

export const initialForm : TForm = {
  projId: '',
  projName: '',
  items: [
    {
      itemId: '',
      status: '',
      majorItem: '',
      middleItem: '',
      material: '',
      quantity: 0,
      materialProfRate: 0,
      unit: '',
      unitPrice: 0,
      rowUnitPriceBeforeTax: 0,
      rowUnitPriceAfterTax: 0,
      costPrice: 0,
      rowCostPriceBeforeTax: 0,
      taxRate: 0.1, // default 10%
      rowCostPriceAfterTax: 0,
    },
  ],
};  


export const initialRow = initialForm.items[0];