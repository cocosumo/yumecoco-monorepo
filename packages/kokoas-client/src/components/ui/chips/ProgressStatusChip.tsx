import { Chip, styled } from '@mui/material';
import { statusBGcolorMap } from 'kokoas-client/src/lib/progressColors';
import { KOrderProgress } from 'types/src/common/order';

export const ProgressStatusChip = styled(Chip)(({ label, onClick }) => ({
  backgroundColor: statusBGcolorMap[label as KOrderProgress],
  color: 'white',
  textShadow: '1px 1px 1px rgba(0,0,0,0.9)',
  borderRadius: 4,
  height: 24,
  letterSpacing: 1,
  width: '100%',
  '&:hover': onClick 
    ? {
      backgroundColor: statusBGcolorMap[label as KOrderProgress],
      filter: 'brightness(120%)',
      
    } 
    : undefined,
  
  cursor: onClick ? 'pointer' : 'not-allowed',
}));