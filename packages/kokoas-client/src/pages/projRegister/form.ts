
import {
  Territory,
  RecordStatus,
  RecordCancelStatus,
  BuildingType,
} from 'types';
import { SaveProjectData } from 'api-andpad';

export interface Remarks {
  id: string,
  noteCreateTime: Date,
  noteUpdateTime: Date,
  remark: string,
}

export interface Log {
  dateTime?: Date,
  log: string,
  id: string,
}

/**
 * Set Initial values here in case MUI is shouting about un/controlled components.
 */
export const initialValues = {
  forceLinkedAndpadSystemId: null as string | null,
  projId: '' as string | undefined,
  projTypeName: '',
  projTypeId: '',
  projName: '',
  projDataId: '',
  createdDate: '',
  storeCode: '',

  custGroupId: undefined  as undefined | string,
  custName: '',
  storeId: '',
  territory: '' as Territory,


  isAgentConfirmed: false,
  cocoConst1: '',
  cocoConst2: '',
  postal: '',
  address1: '',
  address2: '',
  addressKari: '',
  buildingType: '戸建て' as BuildingType,
  isChkAddressKari: false,
  status: '追客中' as RecordStatus,
  hasContract: false,
  hasCompletedContract: false,
  cancelStatus: [] as RecordCancelStatus[],
  andpadDetails : undefined as SaveProjectData | undefined,

  // Remarks
  remarks: [{
    id: 'remarks.0',
    noteCreateTime: new Date(),
    noteUpdateTime: new Date(),
    remark: '',
  }] as Remarks[],

  logs: [] as Log[],
};

export type TypeOfForm = typeof initialValues;
export type KeysOfForm = keyof TypeOfForm;
export type ProjectDetailsValues = Partial<Record<KeysOfForm, string | number | boolean | Array<any>>>;

export const getFieldName = (fieldName: KeysOfForm) => fieldName;