import { Stack } from '@mui/material';
import { PreviewMessage } from './PreviewMessage';


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
    : reminderDate;
  

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
      <PreviewMessage previewDate={previewDate} />
    </Stack>
  );

};
