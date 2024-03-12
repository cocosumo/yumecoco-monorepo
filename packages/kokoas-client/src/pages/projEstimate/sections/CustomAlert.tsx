import { Alert, styled } from '@mui/material';

export const CustomAlert = styled(Alert)(() => ({
  p: '4px 4px',
  '& .MuiAlert-message': {
    display: 'flex',
    alignItems: 'center',
    p: '4px 0px',
  },
}));