import { Fragment } from 'react';
import { YearlyRowHeader } from './common/YearlyRowHeader';
import { YearlyCell } from './common/YearlyCell';
import { projTypeIds } from '../../../../config';
import { GroupedContracts } from '../../../../hooks/groupContracts';

export const YearlyActualPerformance = ({
  data,
  color,
  label,
}: {
  label: string,
  color?: string,
  data: GroupedContracts[string] | undefined,
}) => {
  const {
    contracts,
    contractsByType,
    totalAmtExclTax = 0,
  } = data || {};


  return (
    <Fragment>
      <YearlyRowHeader label={label} />

      {[
        ...projTypeIds,
        'その他',
      ].map((id) => {
        return (
          <YearlyCell 
            color={color} 
            key={id}
            contracts={contractsByType?.[id]?.data || []}
            value={contractsByType?.[id].totalAmtExclTax || 0}
          />
   
        );
      })}

      <YearlyCell 
        color={color}
        contracts={contracts || []}
        value={totalAmtExclTax}
        borderRight='2px solid black'
      />

    </Fragment>
  );
};