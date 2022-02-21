
import { UpsertRecordResult } from '../api/kintone/restapi';
import { InputField, ElementTarget, SubmitStatus } from './forms';

export interface EmployeeTuple {
  id: string,
  name: string
}

export interface MemoFormState {
  isSubmitted: boolean,
  groupId: string,
  custId?: string,
  custName?: string,
  memoType: InputField,
  memoContents: InputField,
  mainCustomerName?: string,
  createdTime?: Date,
  createdBy?: string,
  createdByName?: string,
  notify?: EmployeeTuple[],
  submitState: SubmitStatus
  hasError: boolean
}

export type InitialMemoPayload = { groupId: string, custId: string, custName: string };

export type SubmitPayload = { submitState: SubmitStatus, fetchResponse?: UpsertRecordResult };

export type FieldActionType =
| { type: 'CHANGE_MEMO_VALUE', payload: ElementTarget  }
| { type: 'CHANGE_SUBMITSTATE', payload: SubmitPayload  }
| { type: 'SET_INITIAL', payload: InitialMemoPayload  };