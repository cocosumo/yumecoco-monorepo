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
  custName: string;
  custNameKana: string;
  custAddress: string;
  tel: string;
  storeName: string;
  contractDate: string;
  projCompletedDate: string;
  projName: string;
  uuid: string;
  storeSortNumber: number;
  createdAt: string;
}

export interface IDetail {
  key?: string;
  label: string;
  value: ReactNode;
  fonstSize?: string;
  isSubtle?: boolean;
}

export type KeyOfSearchResult = keyof SearchResult;