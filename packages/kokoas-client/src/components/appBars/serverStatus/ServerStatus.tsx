import { Box, Stack, Tooltip, TooltipProps, Typography, tooltipClasses } from '@mui/material';
import { useCheckServer } from 'kokoas-client/src/hooksQuery';
import styled from '@emotion/styled';
import { useState } from 'react';

const latencyThreshold = 300;

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
});

const GlowingCircleIcon = styled(Box)(({ borderColor }) => ({
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

const TooltipTitle = ({
  alive,
  runtime,
  isFetchedAfterMount,
}:{
  alive: boolean;
  runtime: number;
  isFetchedAfterMount: boolean;
}) => {

  let status = '';
  if (isFetchedAfterMount) {
    if (alive) {
      status = '正常';
    }
  } else {
    status = '接続中';
  }

  if (isFetchedAfterMount && !alive) {
    return (
      <Typography>
        処理サーバーに接続出来なかったため、一部機能が制限されています。
        <br />
        お手数ですが、管理者にお知らせください。
      </Typography>
    );
  }

  return (
    <Stack>
      <Typography fontWeight={'bold'} fontSize={14}>
        サーバー状態
      </Typography>
      <div>
        {`ステータス：${status}`}
      </div>
      <div>
        {`応答時間：${ alive ? `${Math.round(runtime)}ms` : '-' }`}
      </div>
    </Stack>
  );
};

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

  return (
    <NoMaxWidthTooltip
      open={keepTooltipOpen ? true : open}
      placement='right' 
      arrow
      title={<TooltipTitle {...data} isFetchedAfterMount={isFetchedAfterMount} />}
      // 直接 sx が使えないため、componentsProps を使ってスタイルを上書き
      // #https://github.com/mui/material-ui/issues/28679#issuecomment-949277606
      componentsProps={{ 
        tooltip: { 
          sx: { 
            backgroundColor: keepTooltipOpen ? '#A70000' : undefined,
          }, 
        },
        arrow: { 
          sx: { color: keepTooltipOpen ? '#A70000' : undefined }, 
        },
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
          {isFetchedAfterMount ? `${Math.round(runtime)}ms` : '接続中'}
        </GlowingCircleIcon>
      
      </Stack>
    </NoMaxWidthTooltip>
  );
};