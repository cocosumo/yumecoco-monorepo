import { RecordType } from './config';

export const createPaymentList = (estimateRecord: RecordType) => {
  const {
    支払い: { value: paymentObj },
    uuid: { value: uuid },
  } = estimateRecord;

  const paymentData = paymentObj.reduce((acc, cur)=> {
    if (cur.value.isPayEnabled.value === '0') return acc;
    
    if (acc.paymentTypeList.length === 0) {
      return ({
        paymentTypeList: cur.value.paymentType.value,
        paymentAmtPerType: cur.value.paymentAmt.value,
      });
    }
    
    return ({
      paymentTypeList: [acc.paymentTypeList, cur.value.paymentType.value].join(', '),
      paymentAmtPerType: [acc.paymentAmtPerType, cur.value.paymentAmt.value].join(', '),
    });
    
  }, {
    paymentTypeList: '',
    paymentAmtPerType: '',
  });

  return {
    ...paymentData,
    uuid: uuid,
  };
};