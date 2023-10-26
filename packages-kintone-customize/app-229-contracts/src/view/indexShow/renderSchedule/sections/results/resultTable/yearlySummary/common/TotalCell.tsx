import { TableCell, styled } from '@mui/material';

export const TotalCell = styled(TableCell)`
  && {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    border-bottom: 2px solid black;
    border-right: 2px solid black;
  }
  @media print {
    && {
      font-size: 0.75rem;
    }
  }
`;