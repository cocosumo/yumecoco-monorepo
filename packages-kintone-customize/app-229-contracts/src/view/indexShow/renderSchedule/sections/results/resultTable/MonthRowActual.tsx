import { TableCell, TableRow } from '@mui/material';
import { GroupedContracts } from '../../../hooks/groupContracts';
import { projTypesToShow } from '../../../config';
import { roundTo } from 'libs';




export const MonthRowActual = ({
  groupedContractsByProjId,
}:{
  groupedContractsByProjId?: GroupedContracts[string]
}) => {



  return (
    <TableRow >
      <TableCell>
        実績値
      </TableCell>
      {projTypesToShow.map(({
        id,
      }) => {
        const {
          totalContractAmtExclTax = 0,
        } = groupedContractsByProjId?.[id] ?? {};
        return (
          <TableCell key={id}>
            {roundTo(totalContractAmtExclTax / 10000).toLocaleString()}
          </TableCell>
        );
      })}


      {/* その他 */}
      <TableCell>
        {roundTo((groupedContractsByProjId?.['その他'].totalContractAmtExclTax ?? 0) / 10000).toLocaleString()}
      </TableCell>


      <TableCell>
        -
      </TableCell>

      <TableCell>
        -
      </TableCell>


    </TableRow>

  );
  
};