import { Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { HelpHotKeys } from './HelpHotkeys';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Usage } from './Usage';

const HelpButton = () => {
  return (
    <Tooltip title={<HelpHotKeys />}>
      <IconButton size={'small'}>
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );
};

export const OrderTableLabel = () => {

  return (
    <Stack
      direction={'row'}
      spacing={2}
      alignItems="center"
    >
      <Stack direction={'row'} spacing={1} alignItems="center">
        <Typography component={'span'} variant={'h6'}>
          {'発注詳細'}
        </Typography>
        <HelpButton />
        <ArrowBackIcon htmlColor='grey' />
        <Typography component={'span'} variant={'caption'}>
          操作方法
        </Typography>
      </Stack>
      <Divider orientation={'vertical'} flexItem />
      <Usage />
    </Stack>

  );
};