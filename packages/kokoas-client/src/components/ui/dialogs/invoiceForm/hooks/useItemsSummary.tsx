import { summarizeItems } from 'api-kintone/src/order/helpers/summarizeItems';
import { useWatch } from 'react-hook-form';

export const useItemsSummary = () => {
  const items = useWatch({
    name: 'items',
  });

  return summarizeItems(items);

};