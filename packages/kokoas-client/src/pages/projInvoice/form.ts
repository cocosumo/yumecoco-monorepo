

const initPayFields = {
  checked: false,
  amount: 0,
  payDate: '' as Date | '',
};
export type TypeOfPayFields = typeof initPayFields;

export const initialValues = {

  /** 請求書番号 */
  invoiceId: '',

  /** 請求書ステータス */
  invoiceStatus: '' as TInvoiceStatus,

  /** 顧客グループID */
  custGroupId: '',

  /** 顧客名 */
  custName: '',

  /** 見積もり情報 */
  estimates: [
    {
      /** 見積もりインデックス */
      estimateIndex: '',

      /** 工事番号 */
      projId: '',

      /** 工事種別 */
      projTypeName: '',

      /** 枝番 */
      dataId: '',

      /** 契約金額の総額 */
      contractAmount: 0,

      /** 契約金額の非課税金額 */
      nonTaxableAmount: 0,

      /** 請求済み金額 */
      billedAmount: 0,

      /** 作成済み金額 */
      createdAmount: 0,

      /** 請求金額 */
      billingAmount: 0,

      /** 支払い種別 */
      amountType: '',

      /** 請求使用有無 */
      isForPayment: false,

      /** 見積もりuuid */
      estimateId: '',
    },
  ],

  /** 入金予定日 */
  plannedPaymentDate: '',

  /** 入金日未定チェック */
  undecidedPaymentDate: false,

  /** 契約金超過 */
  exceededContract: false,

  /** 契約超過チェック */
  exceedChecked: false,
};

export type TypeOfForm = typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;

/* Utility functions */

export const getFieldName = (s: KeyOfForm) => s;

export type TMaterials = TypeOfForm['estimates'][0];
export type TKMaterials = keyof TMaterials;

export type TInvoiceStatus =
  | 'created'
  | 'sent'
  | 'voided'
  | 'completed'
  | '';
/**
 * 
 フィールド名取得、ヘルパー
 */
const itemsName = getFieldName('estimates');
export const getEstimatesFieldName = (
  rowIdx: number, fieldName: TKMaterials,
) => `${itemsName}[${rowIdx}].${fieldName}`;
