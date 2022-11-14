

const initPayFields = {
  checked: false,
  amount: 0,
  payDate: '' as Date | '',
};
export type TypeOfPayFields = typeof initPayFields;

export const initialValues = {


  /** 請求書番号 */
  invoiceId: '',

  /* 工事番号 */
  projId: '',
  projName: '',

  /* 契約書 */
  estimates: [
    {
      estimateId: '',
      isForPayment: false,
    },
  ],

  /** 請求金の種別 */
  amountType: '',

  /** 請求金額 */
  billingAmount: '',

  /* 入金予定日 */
  plannedPaymentDate: '',
};

export type TypeOfForm = typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;

/* Utility functions */

export const getFieldName = (s: KeyOfForm) => s;

export type TMaterials = TypeOfForm['estimates'][0];
export type TKMaterials = keyof TMaterials;

/**
 * 
 フィールド名取得、ヘルパー
 */
const itemsName = getFieldName('estimates');
export const getEstimatesFieldName = (
  rowIdx: number, fieldName: TKMaterials,
) => `${itemsName}[${rowIdx}].${fieldName}`;
