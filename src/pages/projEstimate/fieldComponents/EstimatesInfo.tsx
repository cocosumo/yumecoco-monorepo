import { FormControl, FormLabel, Stack, Typography } from '@mui/material';


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
    <>
      <Typography textAlign={align} alignSelf={'end'} variant="caption">
        {`${label}:`}
      </Typography>
      <Typography component='span' textAlign={align} alignSelf={'end'}>
        {`${info}`}
      </Typography>
    </>
  );
};

export const EstimatesInfo = ({
  estimateId,
  createdDate,
}: {
  estimateId: string
  createdDate: string
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
    </FormControl>
  );
};