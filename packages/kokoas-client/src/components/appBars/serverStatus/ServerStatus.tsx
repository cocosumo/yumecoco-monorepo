import { Stack } from '@mui/material';
import { useCheckServer } from 'kokoas-client/src/hooksQuery';
import { useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { NoMaxWidthTooltip } from './NonMaxWidthTooltip';
import { GlowingCircleIcon } from './GlowingCircleIcon';
import { TooltipTitle } from './TooltipTitle';

const latencyThreshold = 300;

export const ServerStatus = () => {
  const { data, isFetchedAfterMount } = useCheckServer();
  const [open, setOpen] = useState(false);

  const {
    alive,
    runtime,
  } = data;

  let borderColor = 'grey';

  if (isFetchedAfterMount) {
    if (alive) {
      if (runtime < latencyThreshold) {
        borderColor = 'green';
      } else {
        borderColor = 'orange';
      }
    } else {
      borderColor = 'red';
    }
  }   

  const keepTooltipOpen = isFetchedAfterMount && !alive;
  const color = keepTooltipOpen ? '#A70000' : undefined;

  return (
    <NoMaxWidthTooltip
      open={keepTooltipOpen || open}
      placement='right' 
      arrow
      title={<TooltipTitle {...data} isFetchedAfterMount={isFetchedAfterMount} />}
      // 直接 sx が使えないため、componentsProps を使ってスタイルを上書き
      // #https://github.com/mui/material-ui/issues/28679#issuecomment-949277606
      componentsProps={{ 
        tooltip: { sx: { backgroundColor: color } },
        arrow: { sx: { color: color } },
      }}
    >
      <Stack
        direction="row"
        alignItems={'center'}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <GlowingCircleIcon 
          borderColor={borderColor}
        >
          {!isFetchedAfterMount && (
          <>
            {'接続中'}
          </>)}

          {isFetchedAfterMount && alive && (
          <>
            {`${Math.round(runtime)}ms`}
          </>)}

          {isFetchedAfterMount && !alive && (
          <ErrorIcon color='error' />)}
        </GlowingCircleIcon>
      
      </Stack>
    </NoMaxWidthTooltip>
  );
};