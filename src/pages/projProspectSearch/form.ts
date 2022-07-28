



export const initialValues = {
  projId: '',
  custGroupId: '',
  rank: [] as TProjRank[],
  projName: '',
  schedContractPriceMin: '',
  schedContractPriceMax: '',
  estatePurchaseDateMin: '',
  estatePurchaseDateMax: '',
  planApplicationDateMin: '',
  planApplicationDateMax: '',
  schedContractDateMin : '',
  schedContractDateMax : '',
  memo: '',
  mainSearch: '',
};


export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;
export const getFieldName = (s: KeyOfForm) => s;
