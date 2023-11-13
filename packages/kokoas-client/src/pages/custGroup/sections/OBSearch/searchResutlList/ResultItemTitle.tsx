import { Stack, Typography } from '@mui/material';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import ja from 'date-fns/locale/ja';

export const ResultItemTitle = ({
  custNames,
  createDate,
}:{
  createDate: string, // ISO8601
  custNames: string,
}) => {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      <Typography>
        {custNames}
      </Typography>
      <span>
        <Typography
          sx={{
            display: 'inline-block',
            mr: 1,
          }}
          color={'text.secondary'}
          fontSize={'0.6rem'}
        >
          作成日時：
        </Typography>
        <Typography
          fontSize={'0.75rem'}
        >
          {format(parseISO(createDate), 'yyyy年MM月dd日 hh:mm', { locale: ja }) }
        </Typography>
      </span>


    </Stack>
  );
};