import { TableCell, Tooltip } from '@mui/material';
import { DataByProjType } from '../../../../hooks/groupContracts';
import { roundTo } from 'libs';
import { yellow } from '@mui/material/colors';

export const ContractsCell = ({
  values,
}:{
  values: DataByProjType | undefined
}) => {

  const {
    data = [],
    totalAmtExclTax = 0,
  } = values || {};

  return (
    <Tooltip title={`${data.length} 件 : ${totalAmtExclTax.toLocaleString()} 円`}>
      <TableCell
        sx={{
          ':hover': {
            bgcolor: yellow[100],
            cursor: 'pointer',
          },
        }}
      >
        {roundTo((totalAmtExclTax ?? 0) / 10000).toLocaleString()}
      </TableCell>
    </Tooltip>
  );
};