
import { UpsertRecordResult } from '../api/kintone/restapi';
import { InputField, ElementTarget } from './forms';

export interface EmployeeTuple {
  id: string,
  name: string
}

export interface MemoFormState {
  [key:string] : string | InputField | Date | EmployeeTuple[] | undefined,
  groupId: string,
  custId?: string,
  custName?: string,
  memoType: InputField,
  memoContents: InputField,
  mainCustomerName?: string,
  createdTime?: Date,
  createdBy?: string,
  createdByName?: string,
  notify?: EmployeeTuple[]
}

export type InitialMemoPayload = { groupId: string, custId: string, custName: string };

type SubmitStatus = 'EDITTING' |  'VALIDATE' | 'VALIDATE_SUCCESS' | 'VALIDATE_ERROR' | 'FETCHING' | 'FETCH_ERROR' | 'SUCCESS' | 'SUCCES_UPDATE';
type SubmitPayload = { submitState: SubmitStatus, fetchResponse?: UpsertRecordResult };

export type FieldActionType =
| { type: 'CHANGE_MEMO_VALUE', payload: ElementTarget  }
| { type: 'CHANGE_SUBMITSTATE', payload: SubmitPayload  }
| { type: 'SET_INITIAL', payload: InitialMemoPayload  };