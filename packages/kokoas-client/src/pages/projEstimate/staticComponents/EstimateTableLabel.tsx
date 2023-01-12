import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { HelpHotKeys } from './HelpHotkeys';


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
    </Stack>

  );
};