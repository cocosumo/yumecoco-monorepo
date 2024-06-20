import { v4 } from 'uuid';
import { EstStatusChoices, TForm } from './schema';



export const initialValues : TForm = {
  hasOnProcessContract: false,
  custGroupId: '',

  customerName: '',
  createdDate: undefined,

  estimateId: '',
  estimateDataId: '',
  estimateRevision: '',
  envStatus: '',

  projDataId: '',
  projId: '',
  projName: '',

  projTypeId: '',
  projTypeName: null,
  projTypeProfit: 0,
  projTypeProfitLatest: 0,

  status: '' as EstStatusChoices,
  taxRate: 10,
  items: [
    {
      selected: false,
      itemId: v4(),
      costPrice: 0,
      materialProfRate: 0,
      majorItem: '',
      middleItem: '',
      material: '',
      materialDetails: '',
      quantity: 1,
      rowCostPrice: 0,
      rowDetails: '',
      rowUnitPriceBeforeTax: 0,
      rowUnitPriceAfterTax: 0,
      unit: '式',
      unitPrice: 0,
    },
  ],

  remarks: '',
};

export const initialRow = initialValues.items[0];