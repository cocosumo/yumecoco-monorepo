import { Card, CardContent, Stack, Typography } from '@mui/material';


const LabeledInfo = ({
  label,
  info,
  align = 'left',
  widthRatio,
} : {
  label: string,
  info: string,
  align?: 'left' | 'right'
  widthRatio: number
}) => {
  return (
    <Stack direction={'column'} width={`${widthRatio}%`}>
      <Typography textAlign={align} variant="caption">
        {label}
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
    <Card variant="outlined">
      <CardContent sx={{ p: 1 }}>

        <Stack direction={'column'} spacing={1}>
          <Typography variant="subtitle2">
            編集中の見積もり情報
          </Typography>
        </Stack>
        <Stack direction={'row'}>
          {!estimateId &&
            <Typography variant="body1">
              新規作成
            </Typography>}

          {estimateId && 
          <>
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
          </>}
        </Stack>

      </CardContent>
    </Card>
  );
};