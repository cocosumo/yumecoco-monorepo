import { IProjects } from 'types';



export const getConstAddress = (projRec: IProjects) => {
  if (!projRec) return '';

  const {
    isChkAddressKari,
    isShowFinalAddress,
    address1,
    address2,
    //addressKari, 使用箇所がなくなっているため、対象外
    finalAddress1,
    finalAddress2,
  } = projRec;

  if (Boolean(+isChkAddressKari.value) && Boolean(+isShowFinalAddress.value)) {
    return `${finalAddress1.value}${finalAddress2.value}`;
  } else {
    return `${address1.value}${address2.value}`;
  }

};
