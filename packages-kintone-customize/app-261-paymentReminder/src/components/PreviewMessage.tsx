import { Box, Stack, Typography } from '@mui/material';

export const PreviewMessage = ({
  previewDate,
}: {
  previewDate: string
}) => {


  if (!previewDate) {
    return (
      <Typography variant='body1'>
        入金予定日を設定してください
      </Typography>
    );
  } else if (previewDate === 'default') {
    return (
      <Typography variant='body1'>
        再通知日を設定してください
      </Typography>
    );
  } else {
    return (
      <Box>
        再通知日を
        <Typography variant='h6' component={'span'}>
          {previewDate}
        </Typography>
        にします。
        <br />
        よろしければ「保存」ボタンをクリックしてください。
      </Box>
    );
  }
};
