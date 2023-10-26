import { TAgents } from 'types';
import { TForm } from './schema';
import { v4 as uuidv4 } from 'uuid';

export const getDefaultEmployee = (agentType: TAgents): TForm['cocoAG'][number] => ({
  key: uuidv4(), // generate stable key for rendering
  empId: '',
  empName: '',
  empRole: '',
  empType: agentType,
});

export const initialValues : TForm = {
  projId: '',
  projTypeName: '',
  projTypeId: '',
  projName: '',
  otherProjType: '',
  
  projDataId: '',

  createdDate: '',
  custGroupId: null,
  custName: '',

  yumeAG: [getDefaultEmployee('yumeAG')],
  cocoAG: [],
  cocoConst: [],


  postal: '',
  address1: '',
  address2: '',

  finalPostal: '',
  finalAddress1: '',
  finalAddress2: '',
  //addressKari: '',

  buildingType: '戸建て',

  isAddressKari: false,
  isShowFinalAddress: false,

  status: '追客中',
  hasContract: false,
  hasCompletedContract: false,
  cancelStatus: undefined,
  memo: '',

  deliveryDate: null,
  projFinDate: null,
  payFinDate: null,

  logs: [],

  // 見込み
  rank: '',
  schedContractPrice: 0,
  realEstateStatus: 'あり',
  schedContractDate: null,
  estatePurchaseDate: null,
  planApplicationDate: null,
  paymentMethod: '',

  // 紹介料
  commissionRate: 0,
  profitRate: 0,
  commRateByRole: [],
  commRateByEmployee: [],

  // 店舗情報
  storeName: '',
  storeId: '',
  territory: '',
  storeCode: '',

};


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