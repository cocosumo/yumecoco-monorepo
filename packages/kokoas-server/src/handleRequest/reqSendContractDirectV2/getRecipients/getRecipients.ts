import { TContractData } from '../getContractDataV2';
import { flwElectronic } from './flwElectronic';
import { flwJisha } from './flwJisha';
import { flwService } from './flwService';
import { flwWetInk } from './flwWetInk';

export const getRecipients = (data: TContractData) => {

  const {
    /*     customers,
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
*/
    projTypeName, 
    
    signMethod,
    
  } = data;


  // 自社物件
  if (projTypeName === '自社物件') {
    return flwJisha(data);
  }

  // サービス工事
  if (projTypeName === 'サービス工事') {
    return flwService(data);
  }


  // 電子契約
  if (signMethod === 'electronic') {
    return flwElectronic(data);
  }

  // 紙契約
  if (signMethod === 'wetInk') {
    return flwWetInk(data);
  }

};