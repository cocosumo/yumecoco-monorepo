

const initPayFields = {
  checked: false,
  amount: 0,
  payDate: '' as Date | '',
};
export type TypeOfPayFields = typeof initPayFields;

export const initialValues = {

  /* 工事番号 */
  projId: '',
  projName: '',

  /* 契約書 */
  projContractId: '',

  /* 請求内容 */
  amountType: '', // 請求金の種別
  billingAmount: '', // 請求金額
  
  /* 入金予定日 */
  plannedPaymentDate: '',
};

export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;

/* Utility functions */

export const getFieldName = (s: KeyOfForm) => s;

