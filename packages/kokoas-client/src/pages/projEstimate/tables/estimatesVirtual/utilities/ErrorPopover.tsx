import Popper, { PopperProps } from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { Alert, Box } from '@mui/material';
import { useRef } from 'react';
import { red } from '@mui/material/colors';


/* 
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  scrollContainer: {
    height: 400,
    overflow: 'auto',
    marginBottom: theme.spacing(3),
  },
  scroll: {
    position: 'relative',
    width: '230%',
    backgroundColor: theme.palette.background.paper,
    height: '230%',
  },
  legend: {
    marginTop: theme.spacing(2),
    maxWidth: 300,
  },
  paper: {
    maxWidth: 400,
    overflow: 'auto',
  },
  select: {
    width: 200,
  },
  popper: {
    zIndex: 1,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
      },
    },

   
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
}));
 */
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
            <Alert severity='warning'>
              {errorMessage}
            </Alert>
          </div>
   
        </Fade>
      )}
    </Popper>

  );
};
