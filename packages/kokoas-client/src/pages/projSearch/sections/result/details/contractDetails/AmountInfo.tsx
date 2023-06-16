import { IContracts } from 'types';
import { DetailSection } from '../common/DetailSection';
import { useMemo } from 'react';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { calculateAmount, roundTo } from 'libs';

export const AmountInfo = ({
  record,
}:{
  record: IContracts
}) => {

  const details = useMemo(() => {
    const {
      totalContractAmt,
      totalProfit,
      tax,
    } = record ?? {};

    const {
      amountAfterTax,
      amountBeforeTax,
      costPrice,
      profitRate,
      profit,
      taxRate,
    } = calculateAmount({
      amountAfterTax: +totalContractAmt.value,
      profit: +totalProfit.value,
      taxRate: (+tax.value),
    });

    const result: IDetail[] = [
      {
        label: '税率',
        value: `${roundTo(taxRate * 100, 2)} %`,
      },
      {
        label: '税込金額',
        value: roundTo(amountAfterTax).toLocaleString(),
      },
      {
        label: '税抜金額',
        value: roundTo(amountBeforeTax).toLocaleString(),
      },
      {
        label: '原価',
        value: roundTo(costPrice).toLocaleString(),
      },
      {
        label: '利益（税抜き）',
        value: roundTo(profit).toLocaleString(),
      },
      {
        label: '利益率',
        value: `${roundTo(profitRate * 100, 2)} %`,
      },
    ];

    return result;

  }, 
  [record]);


  return (
    <DetailSection
      title={'金額情報'}
      details={details}
    />
  );
};