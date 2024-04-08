import { Stack, Tooltip, TooltipProps, Typography } from '@mui/material';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';


interface ItemContentProps {
  /** 枝番 */
  sequenceId: string,

  /** 見積金額税込 */
  amountAfterTax: number,

  /** 見積金額税抜 */
  amountBeforeTax: number,

  /** 原価金額税抜 */
  costAmount: number,

  /** 作成日 */
  createDate: string,

  /** 区分 */
  type: string,
}

const CustomTooltip = (props: TooltipProps) => (
  <Tooltip 
    {...props} 
    followCursor 
    placement='top'
    arrow
  />);


const AmountInfo = ({ title, value }: { title: string, value: number }) => (
  <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
    <span>
      {title}
    </span>
    <span>
      {`${value.toLocaleString()} 円`}
    </span>
  </Stack>
);

export const ItemContent = ({
  sequenceId,
  amountAfterTax,
  amountBeforeTax,
  costAmount,
  createDate,
  type,
}:ItemContentProps) => {
  return (
    <Stack 
      direction={'row'} 
      alignItems={'center'} 
      spacing={2} 
    >
      <CustomTooltip title={'枝番'}>
        <Typography fontSize={12} color={'grey.500'} width={30}>
          {sequenceId.slice(-2)}
        </Typography>
      </CustomTooltip>
      <CustomTooltip title={(
        <Stack>
          <AmountInfo title={'原価金額'} value={costAmount} />
          <AmountInfo title={'見積税抜金額'} value={amountBeforeTax} />
          <AmountInfo title={'見積税込金額'} value={amountAfterTax} />
        </Stack> )}
      >
      
        <Stack 
          direction={'row'} 
          justifyContent={'flex-end'} 
          alignItems={'center'}
          spacing={0.5}
          width={80}
        >
        
          <Typography component={'span'}>
            {amountAfterTax.toLocaleString()}
          </Typography>
        
          <Typography fontSize={10} color={'grey.500'} component={'span'}>
            {'円'}
          </Typography>
        </Stack>
      </CustomTooltip>

      <CustomTooltip title={`作成日: ${format(parseISO(createDate), 'yyyy/MM/dd HH:mm')}`}>
        <Typography fontSize={12} width={70}>
          {format(parseISO(createDate), 'yyyy/MM/dd')}
        </Typography>
      </CustomTooltip>

      <CustomTooltip title={'区分'}>
        <Typography fontSize={12} color={'grey.500'} width={50}>
          {type || '-'}
        </Typography>
      </CustomTooltip>

    </Stack>
  );
};