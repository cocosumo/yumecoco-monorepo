import { RecordType } from './config';

export const paymentListCreate = (estimateRecord: RecordType) => {
  const {
    支払い: { value: paymentObj },
    uuid: { value: uuid },
  } = estimateRecord;

  const paymentData = paymentObj.reduce((acc, cur)=> {
    if (cur.value.isPayEnabled.value === '0') return acc;
    
    if (acc.paymentTypeList.length === 0) {
      return ({
        paymentTypeList: cur.value.paymentType.value,
        paymentamtPerType: cur.value.paymentAmt.value,
      });
    }
    
    return ({
      paymentTypeList: [acc.paymentTypeList, cur.value.paymentType.value].join(', '),
      paymentamtPerType: [acc.paymentamtPerType, cur.value.paymentAmt.value].join(', '),
    });
    
  }, {
    paymentTypeList: '',
    paymentamtPerType: '',
  });

  return {
    ...paymentData,
    uuid: uuid,
  };
};