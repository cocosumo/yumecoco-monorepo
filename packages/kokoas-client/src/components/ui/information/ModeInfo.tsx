import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';


import { Caption } from '../typographies';

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
              <Caption text={`id: ${recordId}`} />
              <Caption text={`作成日: ${dateStr}`} />
            </Stack>
          )
      }
    </Stack>
  );

};