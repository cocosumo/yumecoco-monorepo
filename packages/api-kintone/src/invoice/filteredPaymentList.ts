import { RecordType } from '../estimates/config';

export const filteredPaymentList = (estimateRecord: RecordType) => {
  const {
    支払い: { value: paymentObj },
    uuid: { value: uuid },
  } = estimateRecord;


  const paymentData = paymentObj.reduce((acc, cur)=> {
    // 契約書で設定されていない支払い種別は追加しない
    if (cur.value.isPayEnabled.value === '0') return acc;
    
    // 既に使用済みの支払い種別は追加しない(無効化する？)
    


    // 上記以外の支払い種別を追加する
    acc.paymentTypeList.push(cur.value.paymentType.value);
    acc.paymentAmtPerType.push(cur.value.paymentAmt.value);

    return acc;
    
  }, {
    paymentTypeList: [] as string[],
    paymentAmtPerType: [] as string[],
  });
  
  return {
    ...paymentData,
    uuid: uuid,
  };
};