import { Button, Stack, Typography } from '@mui/material';

export const NoAttachments = () => {
  return (
    <Stack >
      <Typography color={'GrayText'}>
        ドラッグ＆ドロップ
      </Typography>
      <Typography color={'GrayText'}>
        または 

        <Button 
          variant='outlined' 
          color='secondary'
          sx={{
            ml: 1,
          }}
          size='small'
        >
          ファイルを選択
        </Button>
      </Typography>
    </Stack>
  );
};