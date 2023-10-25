import { grey } from '@mui/material/colors';
import { StyledCell } from './common/StyledCell';
import { roundTo } from 'libs';
import { Typography } from '@mui/material';

export const MonthCommisionActualLastYear = ({
  amt,
}:{
  amt: number
}) => {
  
  return (
    <StyledCell>
      {roundTo(amt / 10000).toLocaleString()}
      <Typography 
        variant='caption' 
        color={grey[400]}
        ml={0.5}
      >
        万円
      </Typography>
    </StyledCell>
  );
};