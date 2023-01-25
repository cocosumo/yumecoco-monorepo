import * as Yup from 'yup';
import { validationSchema } from './validationSchema';


export type TypeOfForm =  Yup.InferType<typeof validationSchema> ;
export type KeyOfForm = keyof TypeOfForm;
export type KRowFields = keyof TypeOfForm['items'][number];



export const initialValues : TypeOfForm = {
  custGroupId: '',

  customerName: '',
  createdDate: null,

  estimateId: '',
  estimateDataId: '',
  estimateRevision: '',
  envStatus: '',

  projDataId: '',
  projId: '',
  projName: '',

  projTypeId: '',
  projTypeName: '',
  projTypeProfit: 0,
  projTypeProfitLatest: 0,

  status: '',
  taxRate: 10,
  items: [
    {
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
      taxable: true,
      unit: '式',
      unitPrice: 0,
    },
  ],

  totalCostPrice: 0,
  totalAmountBeforeTax: 0,
  totalAmountAfterTax: 0,
};

export const estArrayFieldName : KeyOfForm = 'items';

export const initialRow = initialValues.items[0];
export type Item = typeof initialRow;

export const getItemsFieldName = <T = 'items.0.costPrice'>(
  rowIdx: number, fieldName?: KRowFields,
) => `${estArrayFieldName}.${rowIdx}.${fieldName}` as T;

