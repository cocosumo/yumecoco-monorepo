import { useMemo } from 'react';
import { ContractRow } from '../../hooks/useFilteredContracts';
import { ResultInfoDisplay } from './ResultInfoDisplay';

export const ResultTotalAmount = ({
  items = [],
}: {
  items?: ContractRow[]
}) => {

  const totalAmount = useMemo(() => {
    return items.reduce(
      (acc, cur) => acc + cur.contractAmount,
      0,
    );
  }, [items]);

  return (
    <ResultInfoDisplay
      label='契約金額合計'
      value={totalAmount.toLocaleString()}
      unit='円'
    />
  );
};