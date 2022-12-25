import * as Yup from 'yup';
import { validationSchema } from './validationSchema';


export type TypeOfForm =  Yup.InferType<typeof validationSchema> ;
export type KeyOfForm = keyof TypeOfForm;

export const initialValues : TypeOfForm = {
  custGroupId: '',

  customerName: '',
  createdDate: null,

  estimateId: '',
  estimateDataId: '',
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
      elemProfRate: 0,
      majorItem: '',
      middleItem: '',
      material: '',
      materialDetails: '',
      quantity: 1,
      rowDetails: '',
      rowUnitPriceAfterTax: 0,
      taxable: true,
      unit: '',
      unitPrice: 0,
    },
  ],
  
};

