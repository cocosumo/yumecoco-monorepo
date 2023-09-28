import { Typography } from '@mui/material';

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
    <Typography
      component={'span'}
      variant="body2"
      color="text.primary"
    >
      再通知日を
      {previewDate}
      にします。
      <br />
      よろしければ「保存」ボタンをクリックしてください。
    </Typography>
  );

};
