import { Chip, FormControl, FormLabel, Stack, Typography } from '@mui/material';


const LabeledInfo = ({
  label,
  info,
  align = 'left',
}: {
  label: string,
  info: string,
  align?: 'left' | 'right'
}) => {
  return (
    <Stack direction={'row'} alignItems="end">
      <Typography textAlign={align} variant="caption">
        {`${label}:`}
      </Typography>
      <Typography component='span' alignSelf={'end'}>
        {`${info}`}
      </Typography>
    </Stack>
  );
};

export const EstimatesInfo = ({
  estimateId,
  createdDate,
  envStatus,
}: {
  estimateId: string
  createdDate: string
  envStatus: string
}) => {

  return (
    <FormControl>
      <FormLabel>
        編集中の見積り情報
      </FormLabel>

      {!estimateId &&
        <Typography variant="body1">
          新規作成
        </Typography>}

      {estimateId &&

        <Stack direction={'row'} spacing={1}>
          <LabeledInfo
            label={'ID'}
            info={estimateId}
          />
          <LabeledInfo
            label={'作成日'}
            info={createdDate}
          />
        </Stack>}
      {!!envStatus &&
        <Stack direction={'row'} spacing={1}>
          <Chip
            size='small'
            color='success'
            label='契約'
          />
          <Typography borderBottom={1} color={'error'}>
            契約済のため編集不可
          </Typography>
        </Stack>}
    </FormControl>
  );
};