import { TableCell } from '@mui/material';
import { GroupedContracts } from '../../../../hooks/groupContracts';
import { projTypesToShow } from '../../../../config';
import { ContractsCell } from './common/ContractsCell';
import { Fragment } from 'react';




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
      <TableCell>
        実績値
      </TableCell>
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