
import { UpsertRecordResult } from '../api/kintone/restapi';
import { InputField, ElementTarget, SubmitStatus } from './forms';

export interface EmployeesToNotify {
  'ここすも営業': boolean,
  'ここすも工事': boolean,
  'ゆめてつAG': boolean,
}

export interface MemoFormState {
  isSubmitted: boolean,
  groupId: string,
  $id?:string,
  custId?: string,
  custName?: string,
  memoType: InputField,
  memoContents: InputField,
  mainCustomerName?: string,
  createdTime?: Date,
  createdBy?: string,
  createdByName?: string,
  isNotify: boolean,
  notifyTo: EmployeesToNotify,
  submitState: SubmitStatus
  hasError: boolean
}

export type InitialMemoPayload = { groupId: string, custId: string, custName: string };

export type SubmitPayload = { submitState: SubmitStatus, fetchResponse?: UpsertRecordResult };

export type KeyPayload = { key: keyof EmployeesToNotify };

export type FieldActionType =
| { type: 'CHANGE_MEMO_VALUE', payload: ElementTarget  }
| { type: 'CHANGE_CHECKED_AGENT', payload: KeyPayload  }
| { type: 'CHANGE_SUBMITSTATE', payload: SubmitPayload  }
| { type: 'SET_EDIT', payload: CustomerMemoTypes.SavedData }
| { type: 'SET_INITIAL', payload: InitialMemoPayload  }
| { type: 'RESET' }
| { type: 'CHANGE_ISNOTIFY' };