import { FormControl, FormLabel, Stack, Typography } from '@mui/material';


const LabeledInfo = ({
  label,
  info,
  align = 'left',
  widthRatio,
}: {
  label: string,
  info: string,
  align?: 'left' | 'right'
  widthRatio: number
}) => {
  return (
    <Stack direction={'row'} width={`${widthRatio}%`}
      alignItems="end"
    >
      <Typography textAlign={align} variant="body2">
        {`${label}：`}
      </Typography>
      <Typography textAlign={align} variant="body1">
        {`${info}`}
      </Typography>
    </Stack>
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

        <Stack direction={'row'} spacing={2}>
          <LabeledInfo
            label={'ID'}
            info={estimateId}
            widthRatio={25}
          />
          <LabeledInfo
            label={'作成日'}
            info={createdDate}
            widthRatio={75}
          />

        </Stack>}
    </FormControl>
  );
};