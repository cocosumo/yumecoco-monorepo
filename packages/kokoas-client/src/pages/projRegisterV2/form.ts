import { z } from 'zod';
import { schema } from './schema';

export const initialValues : TypeOfForm = {
  projId: '',
  projTypeName: '',
  projTypeId: '',
  projName: '',
  projDataId: '',
  createdDate: '',
  storeCode: '',
  custGroupId: null,
  custName: '',
  storeId: '',
  territory: null,
  
  isAgentConfirmed: false,
  cocoConst1: '',
  cocoConst2: '',
  postal: '',
  address1: '',
  address2: '',
  addressKari: '',
  buildingType: '戸建て',
  isAddressKari: false,
  status: '追客中',
  hasContract: false,
  hasCompletedContract: false,
  cancelStatus: [],
  andpadDetails: undefined,
  remarks: [{
    id: 'remarks.0',
    noteCreateTime: new Date(),
    noteUpdateTime: new Date(),
    remark: '',
  }],

  logs: [],

};

export type TypeOfForm = z.infer<typeof schema>;
export type KeysOfForm = keyof TypeOfForm;


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