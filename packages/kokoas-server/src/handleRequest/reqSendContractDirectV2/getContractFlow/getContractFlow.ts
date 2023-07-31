import { ReqSendContractParams } from 'types';
import { TContractData } from '../getContractDataV2';

export const getContractFlow = ({
  data,
  signMethod,
}:{
  data: TContractData,
  signMethod: ReqSendContractParams['signMethod'],
}) => {

  const {
    customers,
    cocoAG,
    projName,

    storeMngrName,
    storeMngrEmail,

    accountingName,
    accountingEmail,

    mainAccountingName,
    mainAccountingEmail,

    subAccountingName,
    subAccountingEmail,
  } = data;



};