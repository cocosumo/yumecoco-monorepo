import { IContracts } from 'types';



export type BillingItem = {
  contractType: string;
  label: string;
  amount: number;
  disabled: boolean,
};

export const getBillingItems = ({
  contracts,
}: {
  contracts: IContracts[] | undefined
}) => {
  if (!contracts) return [] as BillingItem[];

  const createBillingItem = (
    contractType: string,
    label: string,
    amount: string,
    hasAmt?: boolean,
  ): BillingItem | null => {
    return (amount !== '0' || hasAmt) ? { contractType, label, amount: +amount, disabled: false } : null;
  };

  const billingItems = contracts?.reduce((acc, {
    contractType,
    contractAmt,
    initialAmt,
    interimAmt,
    finalAmt,
    othersAmt,
    hasRefund,
    refundAmt,
    hasReduction,
    reductionAmt,
    //hasSubsidy,
    //subsidyAmt,
  }, index) => {

    const contractName = `${contractType.value}${index}`;

    const itemsToAdd = [
      createBillingItem(contractName, '契約金', contractAmt.value),
      createBillingItem(contractName, '着手金', initialAmt.value),
      createBillingItem(contractName, '中間金', interimAmt.value),
      createBillingItem(contractName, '最終金', finalAmt.value),
      createBillingItem(contractName, 'その他', othersAmt.value),
      createBillingItem(contractName, '返金', refundAmt.value, hasRefund.value === 'はい'),
      createBillingItem(contractName, '減額', reductionAmt.value, hasReduction.value === 'はい'),
      //createBillingItem(contractName, '補助金', subsidyAmt.value, hasSubsidy.value === 'はい'),
    ];

    return acc.concat(itemsToAdd.filter(item => item !== null) as BillingItem[]);

  }, [] as BillingItem[]);

  return billingItems;

};
