import { Chip, Stack, Typography } from '@mui/material';

import { format, parseISO } from 'date-fns';

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


export const ItemEstimate = ({
  estimateRecord,
}: {
  estimateRecord: Estimates.main.SavedData
}) => {

  const {
    $id: id,
    作成日時: dateCreated, 
    contractPrice,
    estimateStatus,
    envStatus,
  } = estimateRecord;

  return (
    <Stack width={'100%'} direction={'row'} spacing={2}
      alignItems="center" justifyContent="space-around" 
    >
      
      <Stack width={'40%'} spacing={1} direction={'row'}>
        <Chip label={estimateStatus.value} color={'info'} size={'small'} />
        {!!envStatus.value &&
          <Chip label={'契約'} color={'success'} size={'small'} />}
        
      </Stack>

      <LabeledInfo
        label='番号'
        info={id.value}
        widthRatio={10}
      />
      <LabeledInfo
        label='作成日'
        info={format(parseISO(dateCreated.value), 'yy/MM/dd')}
        widthRatio={20}
      />
      <LabeledInfo
        label='契約金額'
        info={`${(+contractPrice.value).toLocaleString() || 0} 円`}
        widthRatio={30}
        align={'right'}
      />

    </Stack>
  );
};