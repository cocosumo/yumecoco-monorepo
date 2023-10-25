import { roundTo } from 'libs';
import { StyledCell } from './common/StyledCell';

export const MonthCommisionActual = ({
  amt,
}:{
  amt: number
}) => {
  
  return (
    <StyledCell>
      {roundTo(amt / 10000).toLocaleString()}
    </StyledCell>
  );
};