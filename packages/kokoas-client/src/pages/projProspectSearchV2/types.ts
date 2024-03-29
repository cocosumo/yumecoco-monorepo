import { ReactNode } from 'react';


export interface ISearchResult {
  /** ランク */
  rank: string,

  /** 顧客名 */
  custNames: string,

  /** 電話番号 */
  tel: string,

  /** 顧客郵便番号 */
  custPostalCode: string,

  /** 顧客住所 */
  custAddress: string,

  /** 工事郵便番号 */
  projPostalCode: string,

  /** 工事住所　*/
  projAddress: string,

  /** 工事確定郵便番号 */
  projPostalCodeConfirmed: string,

  /** 工事確定住所 */
  projAddressConfirmed: string,

  /** 工事番号  */
  projId: string,

  /** 工事データ番号 */
  projDataId: string,
  
  /** 工事名 */
  projName: string,

  /** 店舗名 */
  storeName: string,

  /** 顧客ソート順 */
  storeSortNumber: number,

  /**　ここすもAG */
  cocoAG: string,

  /** ゆめてつAG */
  yumeAG: string,

  /** ここすも工事 */
  cocoConst: string,

  /** 契約予定金額 */
  schedContractAmt: number,

  /** 契約予定日 */
  schedContractDate: string,
  
  /** 不動産決済日 */
  estatePurchaseDate: string,
  
  /** 設計申込日 */
  planApplicationDate: string,

  /** 作成日時 */
  createDate: string,
  
  /** 更新日時 */
  updateDate: string,


}

export interface IDetail {
  key?: string;
  label: string;
  value: ReactNode;
  fonstSize?: string;
  isSubtle?: boolean;
}

export type KSearchResult = keyof ISearchResult;