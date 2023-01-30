


export const initialValues = {
  mainSearch: '',
  projName: '',
  contractDateFrom: '',
  contractDateTo: '',
  amountFrom: '',
  amountTo: '',
};

export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;


/* Utility functions */

export const getFieldName = (s: KeyOfForm) => s;
