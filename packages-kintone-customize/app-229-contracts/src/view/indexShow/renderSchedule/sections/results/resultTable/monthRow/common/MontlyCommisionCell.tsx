import { Tooltip, Typography } from '@mui/material';
import { StyledCell } from './StyledCell';
import { roundTo } from 'libs';
import { grey } from '@mui/material/colors';

export const MonthlyCommisionCell = ({
  amt,
  color,
}:{
  amt: number
  color?: string
}) => {
  
  return (
    <Tooltip title={`${amt.toLocaleString()} 円`}>
      <StyledCell
        sx={{
          color: color,
        }}
      >
        {roundTo(amt / 10000).toLocaleString()}
        <Typography 
          variant='caption' 
          color={grey[400]}
          ml={0.5}
        >
          万円
        </Typography>
      </StyledCell>
    </Tooltip>
  );
};