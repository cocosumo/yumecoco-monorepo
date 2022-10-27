


export const initialValues = {
  isFilterOpen: false,
  mainSearch: '',
  projName: '',
  contractDateFrom: '' as string | Date,
  contractDateTo: '' as string | Date,
  amountFrom: '',
  amountTo: '',
};

export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;


/* Utility functions */

export const getFieldName = (s: KeyOfForm) => s;
