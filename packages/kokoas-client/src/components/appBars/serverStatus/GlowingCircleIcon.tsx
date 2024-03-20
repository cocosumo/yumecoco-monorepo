import { Box, styled } from '@mui/material';

export const GlowingCircleIcon = styled(Box)(({ borderColor }) => ({
  width: 25,
  height: 25,
  fontSize: 6,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'help',
  color: 'white',
  borderRadius: '50%',
  whiteSpace: 'nowrap',
  transition: 'all 0.3s ease',
  boxShadow: `0 0 4px 4px ${borderColor}`,
  // pulse
  animation: 'pulse 2s infinite',
}));
