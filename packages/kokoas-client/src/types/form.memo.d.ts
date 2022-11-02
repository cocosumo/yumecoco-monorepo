

import { ICustmemos } from 'types';


export type NotifyAgent = {
  isNotify: boolean, ids: string[]
};

export interface EmployeesToNotify {
  'ここすも営業': NotifyAgent,
  'ここすも工事': NotifyAgent,
  'ゆめてつAG': NotifyAgent,
}


export type InitialMemoPayload = { groupId: string, custId: string, custName: string, cocoAg: string[], yumeAg: string[] };

export type KeyPayload = { key: keyof EmployeesToNotify };

