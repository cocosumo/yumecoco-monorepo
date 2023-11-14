import { Stack, Typography } from '@mui/material';
import { parseISOTimeToFormat } from 'kokoas-client/src/lib';

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
      width={'100%'}
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
          作成日時
        </Typography>
        <Typography
          fontSize={'0.75rem'}
        >
          {parseISOTimeToFormat(createDate) }
        </Typography>
      </span>


    </Stack>
  );
};