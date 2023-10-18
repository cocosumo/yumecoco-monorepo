import { Tooltip } from '@mui/material';
import { orange } from '@mui/material/colors';
import { roundTo } from 'libs';
import { StyledSummaryCell } from './StyledSummaryCell';

export const YearlyCell = ({
  value,
  color,
  contracts,
}:{
  contracts?: DB.SavedRecord[]
  value: number
  color?: string
  tooltip?: string
}) => {

  const parsedValue = roundTo(value / 10000).toLocaleString();

  return (
    <Tooltip 
      title={`${contracts?.length || 0} 件 : ${value.toLocaleString()} 円`}
      placement="top-end"
      arrow
    >
      <StyledSummaryCell 
        sx={{
          ':hover': {
            bgcolor: orange[200],
            cursor: 'pointer',
          },
          color: color || undefined,

        }}
        align='right'
      >
        {parsedValue}
      </StyledSummaryCell>
    </Tooltip>
  );
};