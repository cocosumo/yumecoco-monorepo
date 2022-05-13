

export const initialValues = {
  projId: '',
  rank: '',
  schedContractPrice: '',
  estatePurchaseDate: '',
  planApplicationDate: '',
  schedContractDate : '',
  memo: '',
};

export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;

export const getFieldName = (s: KeyOfForm) => s;