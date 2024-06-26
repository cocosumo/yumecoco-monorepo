import { useMemo } from 'react';
import { useOrderWatch } from '../../hooks/useOrderRHF';
import { TOrderForm } from '../../schema';
import { summarizeItems } from 'api-kintone/src/order/helpers/summarizeItems';


export const useSummary = () => {
  const selectedItems = useOrderWatch({
    name: 'selectedItems',
  }) as  TOrderForm['selectedItems'];

  return useMemo(() => summarizeItems(selectedItems), [selectedItems]);
};