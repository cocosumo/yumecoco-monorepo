import { TableCell, styled } from '@mui/material';
import { orange } from '@mui/material/colors';


export const StyledSummaryCell = styled(TableCell)`
  && {
    font-size: 22px;
    font-weight: bold;
    text-align: right;
    background-color: ${orange[100]};
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }

  @media print {
    && {
      font-size: 0.8rem;
      padding: 0 8px;
    }
  }
`;
