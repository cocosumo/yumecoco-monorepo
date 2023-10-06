import { TForm } from './schema';

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

  agents: [],


  /* cocoConst1: '',
  cocoConst1Role: '',

  cocoConst2: '',
  cocoConst2Role: '',

  yumeAG1: '',
  yumeAG1Role: '',

  yumeAG2: '',
  yumeAG2Role: '',

  cocoAG1: '',
  cocoAG1Role: '',

  cocoAG2: '',
  cocoAG2Role: '', */

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
  schedContractDate: null,
  estatePurchaseDate: null,
  planApplicationDate: null,
  paymentMethod: '',

  // 紹介料
  commissionRate: null,
  commRateByRole: null,
  profitRate: null,

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