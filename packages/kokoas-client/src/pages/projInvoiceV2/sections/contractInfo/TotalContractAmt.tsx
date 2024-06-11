import { useTypedWatch } from '../../hooks/useTypedRHF';
import { AmountInfo } from '../../parts/AmountInfo';



/** 合計契約金額を表示します */
export const TotalContractAmt = () => {

  const [
    totalContractAmt,
  ] = useTypedWatch({
    name: [
      'totalContractAmtAfterTax',
    ],
  }) as [string];


  return (
    <AmountInfo
      label={'合計契約金額'}
      value={`${totalContractAmt.toLocaleString()} 円`}
      labelVariant='body1'
      valueVariant='h6'
    />
  );
};
