import { TypeOfForm } from './schema';

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
  andpadDetails: null,
  remarks: [{
    id: 'remarks.0',
    noteCreateTime: new Date(),
    noteUpdateTime: new Date(),
    remark: '',
  }],

  logs: [],

};