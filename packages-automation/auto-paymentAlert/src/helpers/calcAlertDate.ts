import { addMonths, parseISO } from 'date-fns';
import { TgtProjType } from '../../config';

export const calcAlertDate = ({
  contractDateStr,
  projType,
  contractAmt,
  contractAmtPaymentDate,
}:{
  contractDateStr: string
  projType: TgtProjType
  contractAmt: number
  contractAmtPaymentDate: Date | null
}) => {  
  const contractDate = parseISO(contractDateStr);

  let paymentDate = new Date();
  if (projType === '新築付帯工事') {
    // 一律1か月後
    paymentDate = addMonths(contractDate, 1);
  } else if (projType === 'リフォーム工事') {
    // 契約金額により設定
    if (contractAmt >= 5000000) {
      paymentDate = addMonths(contractDate, 3);
    } else if (contractAmt >= 3000000) {
      paymentDate = addMonths(contractDate, 2);       
    } else {
      paymentDate = addMonths(contractDate, 1);
    }
  } else if (projType === '新築工事') {
    // 支払予定日
    if (contractAmtPaymentDate) {
      paymentDate = contractAmtPaymentDate;
    } else {
      // 支払予定日が設定されていないものは、3か月後
      paymentDate = addMonths(contractDate, 3);
    }
  }

  return paymentDate;

};
