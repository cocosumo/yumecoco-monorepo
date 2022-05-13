

export const initialValues = {
  projId: '',
  rank: '',
  schedContractPrice: '',
  estatePurchaseDate: '',
  planApplicationDate: '',
  schedContractDate : '',
  memo: '',
};

export type TypeOfInitialValues =  typeof initialValues;
export type KeyOfInitialValues = keyof TypeOfInitialValues;

export const getFieldName = (s: KeyOfInitialValues) => s;