import { useTypedWatch } from './useTypedRHF';



export type BillingItems = {
  contractType: string;
  label: string;
  amount: number;
};

export const useBillingItems = () => {

  const [
    contracts,
  ] = useTypedWatch({
    name: [
      'contractIds',
    ],
  });

  const billingItems: BillingItems[] = [{
    contractType: '契約',
    label: '着工金',
    amount: 600000,
  },
  {
    contractType: '契約',
    label: '最終金',
    amount: 400000,
  },
  {
    contractType: '追加',
    label: 'その他',
    amount: -500000,
  }];

  return billingItems; 
};
