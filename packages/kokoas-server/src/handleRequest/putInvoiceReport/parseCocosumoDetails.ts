import { ParsedCompanyDetailsDatReport } from 'types';

export const parseCocosumoDetails = async (
  cocosumoDetailsDat: DBCompanydetails.SavedData,
): Promise<ParsedCompanyDetailsDatReport> => {

  const {
    companyName,
    postCode,
    companyAddress,
    kensetsugyoKyoka,
    takkengyoNumber,
    kenchikushiJimushoRegister,
    invoiceSystemNumber,
  } = cocosumoDetailsDat;

  return {
    companyName: companyName.value,
    companyPostCode: postCode.value,
    companyAddress: companyAddress.value,
    kenchikugyoKyoka: kensetsugyoKyoka.value,
    takkengyoNumber: takkengyoNumber.value,
    officeRegistration: kenchikushiJimushoRegister.value,
    invoiceSystemNumber: invoiceSystemNumber.value,
  };

};