import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { HelpHotKeys } from './HelpHotkeys';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const EstimateTableLabel = () => {

  return (
    <Stack
      direction={'row'}
      spacing={1}
      alignItems="center"
    >
      <Typography component={'span'} variant={'h6'}>
        {'内訳'}
      </Typography>
      <Tooltip title={<HelpHotKeys />}>
        <IconButton size={'small'}>
          <HelpIcon />
        </IconButton>
      </Tooltip>
      <ArrowBackIcon />
      <Typography component={'span'} variant={'caption'}>
        操作方法
      </Typography>
    </Stack>

  );
};