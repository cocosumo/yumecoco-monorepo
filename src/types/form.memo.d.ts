

import { InputField, ElementTarget, SubmitStatus } from './forms';

export type NotifyAgent = {
  isNotify: boolean, ids: string[]
};

export interface EmployeesToNotify {
  'ここすも営業': NotifyAgent,
  'ここすも工事': NotifyAgent,
  'ゆめてつAG': NotifyAgent,
}

export interface MemoFormState {
  isSubmitted: boolean,
  groupId: string,
  $id?:string,
  custId?: string,
  custName?: string,
  memoType: InputField,
  memoContents: InputField,
  createdTime?: Date,
  createdBy?: string,
  createdByName?: string,
  isNotify: boolean,
  notifyTo: EmployeesToNotify,
  submitState: SubmitStatus
  hasError: boolean
}

export type InitialMemoPayload = { groupId: string, custId: string, custName: string, cocoAg: string[], yumeAg: string[] };

export type SubmitPayload = { submitState: SubmitStatus, fetchResponse?: any };

export type KeyPayload = { key: keyof EmployeesToNotify };

export type FieldActionType =
| { type: 'CHANGE_MEMO_VALUE', payload: ElementTarget  }
| { type: 'CHANGE_CHECKED_AGENT', payload: KeyPayload  }
| { type: 'CHANGE_SUBMITSTATE', payload: SubmitPayload  }
| { type: 'SET_EDIT', payload: CustomerMemoTypes.SavedData }
| { type: 'SET_INITIAL', payload: InitialMemoPayload  }
| { type: 'RESET' }
| { type: 'CHANGE_ISNOTIFY' };