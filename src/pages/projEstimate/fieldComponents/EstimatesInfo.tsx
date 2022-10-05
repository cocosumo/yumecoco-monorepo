import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';


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
}: {
  estimateId: string
}) => {

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 1 }}>

        <Stack direction={'column'} spacing={1} mb={1}>
          <Typography variant="subtitle2">
            編集中の見積もり情報
          </Typography>
        </Stack>
        <Stack direction={'row'} spacing={1} mb={1}>
          {!estimateId &&
            <Typography variant="body1">
              新規作成
            </Typography>}

          {estimateId && 
          <>
            <Chip
              size='small'
              variant='outlined'
              color="success"
              label='test'
            />
            <LabeledInfo 
              label={'契約金額'}
              info={'10,000 円'}
              widthRatio={30}
            />          
            <LabeledInfo 
              label={'作成日'}
              info={'2022/10/05'}
              widthRatio={30}
            />
          </>}
        </Stack>

      </CardContent>
    </Card>
  );
};