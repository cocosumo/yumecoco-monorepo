import { Button, ButtonProps } from '@mui/material';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const baseColor = red[700];
const hoverColor = red[900];

export const AndpadButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(baseColor),
  boxShadow: theme.shadows[1],
  textTransform: 'none',
  fontSize: 12,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: baseColor,
  borderColor: baseColor,
  '&:hover': {
    backgroundColor: hoverColor,
    borderColor: hoverColor,
    boxShadow: theme.shadows[6],
  },
  '&:active': {
    backgroundColor: hoverColor,
    borderColor: hoverColor,
  },
}));