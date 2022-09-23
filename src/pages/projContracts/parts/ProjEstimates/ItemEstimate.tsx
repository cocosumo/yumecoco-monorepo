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
    作成日時: { value: dateCreated }, 
    estimateStatus: { value: estimateStatus },
    envStatus: { value: envStatus },
    内訳 : { value : estimateTable },
    税率: { value: tax },
  } = estimateRecord;

  const taxRate = +tax / 100;

  const estimateAmount = estimateTable
    .reduce((
      acc, 
      { value: { 
        原価: { value: costPrice },
        数量 : { value: quantity },
        税 : { value: taxType },
        部材利益率: { value: materialProfit },
      } }) => {

      const matProfitRate =  +materialProfit / 100;
      const totalCostPrice = +quantity * +costPrice;
      const totalCPWithProfit = totalCostPrice * (1 + matProfitRate);
      const totalInclTax = totalCPWithProfit * (1 + (taxType === '課税' ? taxRate : 0 ) );

      return acc + totalInclTax;
    }, 0); 

  return (
    <Stack width={'100%'} direction={'row'} spacing={2}
      alignItems="center" justifyContent="space-around" 
    >
      
      <Stack width={'40%'} spacing={1} direction={'row'}>
        
        {!!estimateStatus &&
        <Chip label={estimateStatus} color={'info'} size={'small'} />}
        
        {!!envStatus &&
        <Chip label={'契約'} color={'success'} size={'small'} />}
        
      </Stack>

      <LabeledInfo
        label='番号'
        info={id.value}
        widthRatio={10}
      />
      <LabeledInfo
        label='作成日'
        info={format(parseISO(dateCreated), 'yy/MM/dd')}
        widthRatio={20}
      />
      <LabeledInfo
        label='契約金額'
        info={`${(estimateAmount).toLocaleString() || 0} 円`}
        widthRatio={30}
        align={'right'}
      />

    </Stack>
  );
};