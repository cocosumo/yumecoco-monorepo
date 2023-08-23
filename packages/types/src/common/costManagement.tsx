export interface PaymentHistory {
  paymentDate: string | null;
  paymentAmtBeforeTax: number;
}

export interface ProcurementSupplierDetails {

  /**発注先名 */
  supplierName: string;

  /**実行予算金額 (税抜) */
  plannedBudgetCost: number;

  /**発注・経費金額(税抜) */
  contractOrderCost: number;

  /** 発注 */
  paymentHistory: PaymentHistory[];

}

/** @deprecated will use ProcurementDetails instead */
export interface ProcurementInfo {
  supplierName: string;
  orderAmountBeforeTax: number;
  paymentHistory: Array<{
    paymentDate: string | null;
    paymentAmountBeforeTax: number;
  }>;
}


export interface GetCostMgtData {
  projId: string,
  projNum: string,
  projName: string,
  andpadSystemId: string,
  custGroupName: string,

  /** @deprecated */
  maxPaymentDate: string, // ISO string

  /** @deprecated */
  minPaymentDate: string, // ISO string

  months: string[],
  受注金額_税抜: number,
  追加金額_税抜: number,
  発注金額_税抜: number,
  支払金額_税抜: number,
  予定利益率: number,
  予定利益額: number,
  実利益率: number,
  実利益額: number,
  利益配分_夢てつ: number,
  利益配分_ここすも: number,
  実利益税抜_夢てつ: number,
  実利益税抜_ここすも: number,
  利益税抜_夢てつ: number,
  利益税抜_ここすも: number,
  受注額計_税込: number,
  受注額計_税抜: number,
  入金額: number,
  未入金: number,
  夢てつ営業: string,
  ここすも営業: string,
  ここすも工事: string,
  発注情報詳細: ProcurementSupplierDetails[],
}


/*************************
 * REQUESTS HANDLER TYPES
 */

export type GetCostMgtExcelByDataResult = {
  fileName: string;
  fileB64: string;
} | Error;