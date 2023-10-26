import { Tooltip } from '@mui/material';
import { DataByProjType } from '../../../../../hooks/groupContracts';
import { roundTo } from 'libs';
import { yellow } from '@mui/material/colors';
import { StyledCell } from './StyledCell';
import styles from './ContractsCell.module.css';

export const ContractsCell = ({
  values,
  color,
}:{
  values: DataByProjType | undefined,
  color?: string
}) => {

  const {
    data = [],
    totalAmtExclTax = 0,
  } = values || {};

  return (
    <Tooltip title={`${data.length} 件 : ${totalAmtExclTax.toLocaleString()} 円`}>
      <StyledCell
        sx={{
          color,
          ':hover': {
            bgcolor: yellow[100],
            cursor: 'pointer',
          },
        }}
        className={`${styles.contractsCell} ${color === 'red' ? styles.emphasized : ''}`}
      >

        {roundTo((totalAmtExclTax ?? 0) / 10000).toLocaleString()}
      </StyledCell>
    </Tooltip>
  );
};