



export const initialValues = {
  projId: '',
  custGroupId: '',
  rank: [] as TProjRank[],
  projName: '',
  schedContractPriceMin: null as number | null,
  schedContractPriceMax: null as Date | null,
  estatePurchaseDateMin: null as Date | null,
  estatePurchaseDateMax: null as Date | null,
  planApplicationDateMin: null as Date | null,
  planApplicationDateMax: null as Date | null,
  schedContractDateMin : null as Date | null,
  schedContractDateMax : null as Date | null,
  memo: '',
  mainSearch: '',
};


export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;
export const getFieldName = (s: KeyOfForm) => s;
