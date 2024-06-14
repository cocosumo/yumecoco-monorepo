import { ContractType } from 'kokoas-client/src/pages/projContractV2/schema';
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

  
  const contractNum = contracts.reduce((acc, { contractType }) => {
    if (contractType.value === '契約') {
      acc.formalContractsNum += 1;
    } else if (contractType.value === '追加') {
      acc.addContractsNum += 1;
    }

    return acc;

  }, {
    formalContractsNum: 0,
    addContractsNum: 0,
  });


  const createBillingItem = (
    contractType: string,
    label: string,
    amount: string,
    hasAmt?: boolean,
  ): BillingItem | null => {
    return (amount !== '0' || hasAmt) ? { contractType, label, amount: +amount, disabled: false } : null;
  };
  
  const getContractName = (contractType: string, index: number) => {
    if ((contractType === '契約' && contractNum.formalContractsNum > 1)
      || (contractType === '追加' && contractNum.addContractsNum > 1)) {
      return `${contractType}${index}`;
    }
    return contractType;
  };

  const contractCounters = {
    設計契約: 0,
    契約: 0,
    追加: 0,
  };

  const getContractIndex = (contractType: ContractType) => {
    if (Object.prototype.hasOwnProperty.call(contractCounters, contractType)) {
      contractCounters[contractType]++;
      return contractCounters[contractType];
    }
    return 0;
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
  }) => {
    const index = getContractIndex(contractType.value as ContractType);
    const contractName = getContractName(contractType.value, index);

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
