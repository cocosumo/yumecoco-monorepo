import { Stack } from '@mui/material';
import { PreviewMessage } from './PreviewMessage';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';


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
  let previewDate = reminderDate;
  if (dateSplit.length >= 3) {
    const parsedDate = parseISO(reminderDate);
    previewDate = format(parsedDate, 'yyyy年MM月dd日');
  }


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
