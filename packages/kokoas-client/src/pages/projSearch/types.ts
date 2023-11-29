import { ReactNode } from 'react';

export type Option = {
  label: string,
  value: string,
  isRetired: boolean,
  sortKey: number,
};

export type GroupedEmployees = {
  [key: string]: Option[]
};

export interface SearchResult {
  /** 一つ目の顧客 */
  custName: string;
  /** 全顧客 */
  custNames: string;
  custNameKana: string;
  custPostalCode: string;
  custAddress: string;
  tel: string;
  telRelation: string;
  storeName: string;

  /** 発注の支払開始日 */
  procurementPaymentDateStart: string;
  /** 発注の支払い完了日 */
  procurementPaymentDateEnd: string;

  contractDate: string;
  deliveryDate: string;
  projPostalCode: string;
  projAddress: string;
  projPostalCodeConfirmed: string;
  projAddressConfirmed: string;
  projFinDate: string;
  payFinDate: string;
  lastBillDate: string;

  /** 入金完了日 */
  receivableCompleteDate: string;
  
  projName: string;
  projDataId: string;

  totalContractAmtIncTax: number;

  yumeAG: string;
  cocoAG: string;
  cocoConst: string;

  uuid: string;
  storeSortNumber: number;
  createdAt: string;
  updatedAt: string;
}

export interface IDetail {
  key?: string;
  label: string;
  value: ReactNode;
  fonstSize?: string;
  isSubtle?: boolean;
}

export type KeyOfSearchResult = keyof SearchResult;