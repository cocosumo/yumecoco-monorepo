import { useMemo } from 'react';
import { useOrderWatch } from '../../hooks/useOrderRHF';
import { TOrderForm } from '../../schema';
import { Big } from 'big.js';

interface ReturnType {
  totalAmountBeforeTax: number;
  totalTax: number;
  totalAmountAfterTax: number;
}

interface GroupByTaxRate {
  number: Big;
}

export const useSummary = () => {
  const selectedItems = useOrderWatch({
    name: 'selectedItems',
  }) as  TOrderForm['selectedItems'];

  return useMemo<ReturnType>(() => {

    const {
      totalAmountBeforeTax,
      totalTaxable,
    } = selectedItems.reduce<GroupByTaxRate>((acc, item) => {
      const {
        rowCostPriceBeforeTax,
        taxRate,
      } = item;

      const rowCostPriceBeforeTaxBig = new Big(rowCostPriceBeforeTax);
      const taxRateBig = new Big(taxRate);

      if(!acc[taxRate]) {
        acc[taxRate] = rowCostPriceBeforeTaxBig;
      }

      return acc;
    }, Object.create(null));

    return {
      totalAmountBeforeTax: totalAmountBeforeTax.toNumber(),
      totalTax: ,
      totalAmountAfterTax: totalAmountBeforeTax.plus(totalTax).toNumber(),
    };

  }, [selectedItems]);
};