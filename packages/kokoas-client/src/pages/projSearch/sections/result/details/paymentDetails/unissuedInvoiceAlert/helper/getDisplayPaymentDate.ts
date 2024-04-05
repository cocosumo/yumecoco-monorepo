import format from 'date-fns/format';



export const getDisplayPaymentDate = (paymentDate: string | null) => {

  if (!paymentDate || isNaN(new Date(paymentDate).getDate())) {
    // 日付データではない場合
    return '';
  }

  return `${format(new Date(paymentDate), 'yyyy年M月d日')}`;

};
