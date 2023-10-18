import { TableCell, TableRow } from '@mui/material';
import { projTypesToShow } from '../../../../config';
import { GroupedContracts } from '../../../../hooks/groupContracts';
import { ContractsCell } from '../tableComponents/ContractsCell';

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
    <TableRow 
      sx={{

        '& .MuiTableCell-root:not(:first-of-type)': {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'right',
        },
      }}
    >
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

      <TableCell>
        -
      </TableCell>


    </TableRow>
  );
};