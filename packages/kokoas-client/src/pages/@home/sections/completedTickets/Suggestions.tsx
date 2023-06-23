import { Button, Stack, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ChatworkLogo } from 'kokoas-client/src/components/ui/icons/ChatworkLogo';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { chatWorkLink } from 'config';

export const Suggestions = () => {
  return (
    <Stack
      justifyContent={'flex-start'} 
      alignItems={'center'}
      direction={'row'} 
      spacing={2}
    >
      <Typography
        variant='body1' 
        color={grey[500]}
      >
        不具合や要望はありますか？気楽にご連絡ください。
      </Typography>
      <Tooltip title="いつでも依頼登録可能">
        <Button
          href='https://rdmuhwtt6gx7.cybozu.com/k/236/edit'
          target='_blank'
          rel='noopener noreferrer' 
          variant='outlined'
          color={'warning'}
          startIcon={<TipsAndUpdatesIcon />}
          size='small'
        >
          依頼登録
        </Button>
      </Tooltip>

      {chatWorkLink && (
      <Tooltip title="チャットワークでの連絡となります。回答が遅れる場合がございます。">
        <Button
          href={chatWorkLink}
          variant='outlined'
          target='_blank'
          rel='noopener noreferrer'
          startIcon={<ChatworkLogo />}
          color='error'
          size='small'
        >
          チャットワーク
        </Button>
      </Tooltip>
      )}

    </Stack>
  );
};