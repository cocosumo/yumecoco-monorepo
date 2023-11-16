import { TContractData } from '../../handleRequest/reqSendContractDirectV2/getContractDataV2';

const serviceProjTypeid = '3b450da3-19fe-45bd-2406-3ded7f44fe86';

export const validateContractData = (data: TContractData) => {
  const {
    customers,
    cocoAG,
    storeMngrName,
    storeMngrEmail,

    accountingName,
    accountingEmail,

    signMethod,
  } = data;


  if (!cocoAG?.[0]?.email) throw new Error(`COCO担当メールは指定されていません。${cocoAG?.[0]?.name}`);
  if (!storeMngrEmail) throw new Error(`店長メールは指定されていません。${storeMngrName}`);
  if (!accountingEmail) throw new Error(`経理メールは指定されていません。${accountingName}`);

  if (signMethod === 'electronic' 
  && data.projTypeId !== serviceProjTypeid) { // K256
    const invalidEmail = customers.find(({ email }) => !email);
    if (invalidEmail) throw new Error(`顧客メールは指定されていません。${invalidEmail.custName}`);
  }
};
