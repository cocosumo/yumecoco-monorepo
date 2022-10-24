


export const initialValues = {
  mainSearch: '',

};

export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;


/* Utility functions */

export const getFieldName = (s: KeyOfForm) => s;
