import Popper, { PopperProps } from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { Alert, Box } from '@mui/material';
import { useRef } from 'react';
import { red } from '@mui/material/colors';

export const  ErrorPopover = ({
  ancholErrEl,
  errorMessage,
}: {
  ancholErrEl: PopperProps['anchorEl']
  errorMessage?: string,
}) => {
  const arrowRef = useRef<HTMLSpanElement>(null);

  const open = !!(document.body.contains(ancholErrEl as HTMLInputElement)) && !!errorMessage;

  return (

    <Popper
      open={open}
      anchorEl={ancholErrEl}
      transition
      placement="bottom-start"
      sx={(theme) => ({
        zIndex: theme.zIndex.appBar + 1,
      })}
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ]}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <div>
            <Box ref={arrowRef} sx={{
              top: 0,
              left: 16,
              marginTop: '-0.9em',
              width: '3em',
              height: '1em',
              position: 'absolute',
              fontSize: 7,
              '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: `transparent transparent ${red[50]} transparent`,
                content: '""',
                margin: 'auto',
                display: 'block',
                width: 0,
                height: 0,
                borderStyle: 'solid',
              },
            }}
            />
            <Alert
              severity='warning'
              sx={{
                boxShadow: 3,
              }}
            >
              {errorMessage}
            </Alert>
          </div>

        </Fade>
      )}
    </Popper>

  );
};
