import { ContractType } from 'kokoas-client/src/pages/projContractV2/schema';
import { IContracts } from 'types';
import { BilledItem } from './getBilledItems';



export type BillingItem = {
  contractType: string;
  label: string;
  amount: number;
  disabled: boolean,
};

export const getAllBillingItems = ({
  contracts,
  billedItems,
}: {
  contracts: IContracts[] | undefined
  billedItems: BilledItem[]
}) => {
  if (!contracts) return [] as BillingItem[];

  /** 同じカテゴリの契約書が複数ある場合に、ナンバリングする */
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

  /**　契約書の情報から請求項目を準備する */
  const createBillingItem = (
    contractType: string,
    label: string,
    amount: string,
    hasAmt?: boolean,
  ): BillingItem | null => {

    if (amount !== '0' || hasAmt) {
      const hasInvoice = billedItems.some(({ contractType: pastContType, label: pastLabel }) => {
        return (pastContType === contractType) && (pastLabel === label);
      });

      return {
        contractType,
        label,
        amount: +amount,
        disabled: hasInvoice,
      };
    } else {
      return null;
    }
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
