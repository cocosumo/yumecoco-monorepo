import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

export const PreviewMessage = ({
  previewDate,
}: {
  previewDate: string
}) => {


  if (!previewDate) {
    return (
      <Stack spacing={2} direction={'row'} alignItems={'flex-end'}>
        入金予定日を設定してください
      </Stack>
    );
  } else if (previewDate === 'default') {
    return (
      <Stack spacing={2} direction={'row'} alignItems={'flex-end'}>
        再通知日を設定してください
      </Stack>
    );
  } else {
    return (
      <>
        <Stack spacing={2} direction={'row'} alignItems={'flex-end'}>
          再通知日を
          <Typography variant='h6' component={'span'}>
            {previewDate}
          </Typography>
          にします。
        </Stack>
        よろしければ「保存」ボタンをクリックしてください。
      </>
    );
  }
};
