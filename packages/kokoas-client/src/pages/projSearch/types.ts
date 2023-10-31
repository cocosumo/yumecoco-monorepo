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
  custAddress: string;
  tel: string;
  telRelation: string;
  storeName: string;
  contractDate: string;
  deliveryDate: string;
  projAddress: string;
  projAddressConfirmed: string;
  projFinDate: string;
  payFinDate: string;
  lastBillDate: string;
  projName: string;
  projDataId: string;

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