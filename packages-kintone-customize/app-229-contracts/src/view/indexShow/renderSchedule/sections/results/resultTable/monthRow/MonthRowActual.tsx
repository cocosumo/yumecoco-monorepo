import { TableCell, TableRow } from '@mui/material';
import { GroupedContracts } from '../../../../hooks/groupContracts';
import { projTypesToShow } from '../../../../config';
import { ContractsCell } from '../tableComponents/ContractsCell';




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
    <TableRow 
      sx={{

        '& .MuiTableCell-root:not(:first-of-type)': {
          fontWeight: 'bold',
          fontSize: 24,
          color: 'red',
          textAlign: 'right',
        },
      }}
    >
      <TableCell>
        実績値
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