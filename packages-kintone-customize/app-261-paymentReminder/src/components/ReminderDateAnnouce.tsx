import { Stack, Typography } from '@mui/material';


/**
 * 再通知日を表示する
 * @param param0 再通知日をyyyy-MM-dd形式で
 * @returns 
 */
export const ReminderDateAnnouce = ({
  reminderDate,
}: {
  reminderDate: string
}) => {

  const dateSplit = (reminderDate ?? '').split('-');
  const previewDate = dateSplit.length >= 3 ?
    `${dateSplit[0]}年${dateSplit[1]}月${dateSplit[2]}日`
    : dateSplit;

  return (
    <Stack
      spacing={1}
      direction={'column'}
      alignItems={'flex-start'}
      sx={{
        paddingTop: 2,
        paddingLeft: 2,
      }}
    >
      {reminderDate === 'default' ?
        '再通知日を設定してください'
        : <>
          <Stack spacing={2} direction={'row'} alignItems={'flex-end'}>
            再通知日を
            <Typography variant='h6' component={'span'}>
              {previewDate}
            </Typography>
            にします。
          </Stack>
          よろしければ「保存」ボタンをクリックしてください。
        </>}
    </Stack>
  );

};
