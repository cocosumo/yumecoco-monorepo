import { TContractData } from '../getContractDataV2';
import { flwElectronic } from './flwElectronic';
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

    projTypeName, */
    
    signMethod,
    
  } = data;

  // 順番にチェックされるので、

  // 電子契約
  if (signMethod === 'electronic') {
    return flwElectronic(data);
  }

  // 紙契約
  if (signMethod === 'wetInk') {
    return flwWetInk(data);
  }

  // wetInk

  // jisha

  // sabisu



};