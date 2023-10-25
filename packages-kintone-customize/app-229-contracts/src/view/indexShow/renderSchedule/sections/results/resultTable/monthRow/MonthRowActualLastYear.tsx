import { TableCell } from '@mui/material';
import { projTypesToShow } from '../../../../config';
import { GroupedContracts } from '../../../../hooks/groupContracts';
import { ContractsCell } from './common/ContractsCell';
import { Fragment } from 'react';

export const MonthRowActualLastYear = ({
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
        昨年実績値
      </TableCell>
      {projTypesToShow.map(({
        id,
      }) => {
        return (
          <ContractsCell key={id} values={contractsByType?.[id]} />
        );
      })}


      {/* その他 */}
      <ContractsCell values={contractsByType?.['その他']} />

      {/* 合計 */}
      <ContractsCell values={{
        data: contracts,
        totalAmtExclTax,
      }}
      />


    </Fragment>
  );
};