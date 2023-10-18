import { TableCell, styled } from '@mui/material';
import { orange } from '@mui/material/colors';

export const StyledSummaryCell = styled(TableCell)`
  && {
    font-size: 22px;
    font-weight: bold;
    text-align: right;
    background-color: ${orange[100]};
  }
`;
