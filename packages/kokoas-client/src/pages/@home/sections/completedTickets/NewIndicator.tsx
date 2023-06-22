import { Chip, keyframes } from '@mui/material';

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -10px, 0);
  }

  70% {
    transform: translate3d(0, -5px, 0);
  }

  90% {
    transform: translate3d(0,-1px,0);
  }
`;



export const NewIndicator = () => {
  return (
    <Chip 
      variant='outlined'
      color='success' 
      label={'新着'} 
      size='small'
      sx={{
        mr: 1,
        animation: `${bounce} 1s infinite`,
      }}
    />
  );
};