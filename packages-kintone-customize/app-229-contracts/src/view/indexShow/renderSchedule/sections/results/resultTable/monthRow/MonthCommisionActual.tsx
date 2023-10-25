import { roundTo } from 'libs';
import { StyledCell } from './common/StyledCell';
import { Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

export const MonthCommisionActual = ({
  amt,
}:{
  amt: number
}) => {
  
  return (
    <StyledCell
      sx={{
        color: blue[600],
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
  );
};