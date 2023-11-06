import { IContracts } from 'types';
import { DetailSection } from '../common/DetailSection';
import { useMemo } from 'react';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { roundTo } from 'libs';
import { parseISODateToFormat } from 'kokoas-client/src/lib';

export const PaymentInfo = ({
  record,
}: {
  record: IContracts
}) => {

  const details = useMemo(() => {
    const {
      contractAmt,
      contractAmtDate,

      initialAmt,
      initialAmtDate,

      interimAmt,
      interimAmtDate,

      finalAmt,
      finalAmtDate,

      othersAmt,
      othersAmtDate,

      refundAmt,

      reductionAmt,
      refundMethod,

      subsidyAmt,
      subsidyMethod,

      payMethod,
      payDestination,
    } = record ?? {};

    const resolvePayment: IDetail[] = [
      ['契約金', contractAmt.value, contractAmtDate.value],
      ['着手金', initialAmt.value, initialAmtDate.value],
      ['中間金', interimAmt.value, interimAmtDate.value],
      ['最終金', finalAmt.value, finalAmtDate.value],
      ['その他金', othersAmt.value, othersAmtDate.value],
    ].map(([label, amt, date]) => {
      const parsedAmt = +amt;
      return {
        label,
        value: `${roundTo(parsedAmt).toLocaleString()} ${date && parsedAmt ? `(${parseISODateToFormat((date))})` : ''}`,
      };
    });

    const parsedSubsidyAmt = +subsidyAmt.value;


    const result: IDetail[] = [
      ...resolvePayment,
      {
        label: '返金',
        value: +refundAmt.value ? `${(+refundAmt.value).toLocaleString()} (${refundMethod.value})` : '-',
      },
      {
        label: '減額',
        value: `${(+reductionAmt.value).toLocaleString()}`,
      },
      {
        label: '補助金',
        value: `${(parsedSubsidyAmt).toLocaleString()}`,
      },
      {
        label: '支払方法',
        value: `${payMethod.value} ${payMethod.value === '振込' ? `(${payDestination.value})` : ''}`,
      },
    ];


    return result;

  },
  [record]);


  return (
    <DetailSection
      title={'支払い情報'}
      details={details}
    />
  );
};