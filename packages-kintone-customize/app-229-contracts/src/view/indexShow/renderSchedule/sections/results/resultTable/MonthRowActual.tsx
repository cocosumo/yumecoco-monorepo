import { TableCell, TableRow } from '@mui/material';
import { GroupedContracts } from '../../../hooks/groupContracts';
import { projTypesToShow } from '../../../config';
import { roundTo } from 'libs';




export const MonthRowActual = ({
  groupedContractsByProjId,
}:{
  groupedContractsByProjId?: GroupedContracts[string]['monthlyData'][number]
}) => {



  return (
    <TableRow 
      sx={{

        '& .MuiTableCell-root:not(:first-of-type)': {
          fontWeight: 'bold',
          fontSize: 20,
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
        const {
          totalContractAmtExclTax = 0,
        } = groupedContractsByProjId?.data?.[id] ?? {};
        return (
          <TableCell key={id}>
            {roundTo(totalContractAmtExclTax / 10000).toLocaleString()}
          </TableCell>
        );
      })}


      {/* その他 */}
      <TableCell>
        {roundTo((groupedContractsByProjId?.data['その他'].totalContractAmtExclTax ?? 0) / 10000).toLocaleString()}
      </TableCell>


      <TableCell>
        {roundTo((groupedContractsByProjId?.totalAmtExclTax ?? 0) / 10000 ).toLocaleString()}
      </TableCell>

      <TableCell>
        -
      </TableCell>


    </TableRow>

  );
  
};