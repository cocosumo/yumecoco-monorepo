import { Stack, StackProps, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode, forwardRef, useState } from 'react';


export interface Props extends StackProps {
  children: ReactNode
  emphasis: string
  disabled?: boolean
  disabledMessage?: string
  onClick?: () => void
}


export const AndpadButtonContainer = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    children,
    emphasis,
    disabled = false,
    disabledMessage,
    onClick,
    ...others
  } = props;
  const [hover, setHover] = useState(false);

  return (
    <Stack 
      ref={ref}
      direction='row'
      spacing={1}
      width={'50%'} 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={disabled ? undefined : onClick}
      sx={{
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      {...others}

    >
      {children}
      {disabled && (
        <Typography color={grey[600]}>

          {disabledMessage}
        </Typography>
      )}
      {!disabled && (
        <Stack
          direction={'row'}
          sx={{
            color: grey[600],
          }}
          spacing={1}
        >
          <Typography>
            ANDPADへ
          </Typography>
          <Typography
            fontWeight={'bold'}
            sx={{
              transform: hover ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {emphasis}
          </Typography>
          <Typography>
            、押してください
          </Typography>

        </Stack>
        
      )}
      
      
    </Stack>
  );
});

AndpadButtonContainer.displayName = 'AndpadButtonContainer';