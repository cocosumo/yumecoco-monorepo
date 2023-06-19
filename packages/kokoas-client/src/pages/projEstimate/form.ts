import { TForm } from './schema';



export const initialValues : TForm = {
  custGroupId: '',

  customerName: null,
  createdDate: null,

  estimateId: undefined,
  estimateDataId: null,
  estimateRevision: null,
  envStatus: null,

  projDataId: '',
  projId: '',
  projName: '',

  projTypeId: null,
  projTypeName: null,
  projTypeProfit: 0,
  projTypeProfitLatest: 0,

  status: null,
  taxRate: 10,
  items: [
    {
      costPrice: 0,
      materialProfRate: 0,
      majorItem: null,
      middleItem: null,
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

  remarks: null,
};

export const initialRow = initialValues.items[0];