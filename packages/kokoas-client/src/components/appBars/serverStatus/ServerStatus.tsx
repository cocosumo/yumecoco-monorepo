import { Alert, Box, Stack, Tooltip, Typography } from '@mui/material';
import { useCheckServer } from 'kokoas-client/src/hooksQuery';
import styled from '@emotion/styled';
import { useState } from 'react';

// Glowing CircleIcon

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
      <Alert severity="error" variant='standard' >
        処理サーバーに接続できません。
        <br />
        管理者にお知らせください
      </Alert>
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
      if (runtime < 200) {
        borderColor = 'green';
      } else {
        borderColor = 'orange';
      }
    } else {
      borderColor = 'red';
    }
  } 

  return (
    <Tooltip
      open={isFetchedAfterMount && !alive ? true : open}
      placement='right' 
      arrow
      title={<TooltipTitle {...data} isFetchedAfterMount={isFetchedAfterMount} />}
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
    </Tooltip>
  );
};