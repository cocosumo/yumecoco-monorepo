import { GroupedContracts } from '../../../../hooks/groupContracts';
import { projTypesToShow } from '../../../../config';
import { ContractsCell } from './common/ContractsCell';
import { Fragment } from 'react';
import { MonthRowTitle } from './common/MonthRowTitle';




export const MonthRowActual = ({
  contractsData,
}:{
  contractsData?: GroupedContracts[string]['monthlyData'][number]
}) => {

  const {
    contractsByType,
    totalAmtExclTax = 0,
    contracts = [],
  } = contractsData ?? {};

  return (
    <Fragment>
      <MonthRowTitle label='実績値' />

      {projTypesToShow.map(({
        id,
      }) => {
        return (
          <ContractsCell 
            key={id} 
            values={contractsByType?.[id]}
            color='red'
          />
        );
      })}


      {/* その他 */}
      <ContractsCell 
        values={contractsByType?.['その他']}
        color='red'
      />
 
      {/* 合計 */}
      <ContractsCell
        values={{
          data: contracts,
          totalAmtExclTax,
        }}
        color='red'

      />

    </Fragment>

  );
  
};