import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';


import { LabeledInfo } from '../typographies';

export const ModeInfo = (
  {
    recordId,
    dateStr,
  }: {

    recordId: string,
    dateStr: string,
  },
) => {
  return (
    <Stack direction={'column'}>
      <Typography whiteSpace={'nowrap'}>
        編集中の見積り情報
      </Typography>
      {
        !recordId
          ? (
            <Typography fontWeight={'bold'} color={grey[800]}>
              新規作成
            </Typography>
          )
          : (
            <Stack direction="row" spacing={1}>
              <LabeledInfo label='id' info={recordId} />
              <LabeledInfo label='作成日' info={dateStr} />
            </Stack>
          )
      }
    </Stack>
  );

};