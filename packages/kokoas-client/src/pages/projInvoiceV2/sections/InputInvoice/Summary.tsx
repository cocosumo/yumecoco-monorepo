import { Box, Divider, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { AmountInfo } from '../../parts/AmountInfo';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { Big } from 'big.js';
import { ComponentProps, useMemo } from 'react';



export const Summary = () => {

  const [
    billingAmount,
  ] = useTypedWatch({
    name: [
      'billingAmount',
    ],
  }) as [number];

  const summary: ComponentProps<typeof AmountInfo>[] = useMemo(() => {

    const billingTotalBeforeTax = Big(billingAmount).div(1.1)
      .round()
      .toNumber();

    const taxAmount = Big(billingAmount).minus(billingTotalBeforeTax)
      .toNumber();

    return (
      [
        {
          label: '合計金額',
          value: `${billingAmount.toLocaleString()} 円`,
          labelVariant: 'h6',
          valueVariant: 'h5',
        },
        {
          label: '税抜金額',
          value: `${billingTotalBeforeTax.toLocaleString()} 円`,
          labelVariant: 'body2',
          valueVariant: 'body1',
        },
        {
          label: '消費税額(10%)',
          value: `${taxAmount.toLocaleString()} 円`,
          labelVariant: 'body2',
          valueVariant: 'body1',
        },
      ]
    );
  }, [billingAmount]);



  return (
    <Box
      bgcolor='white'
      p={2}
      border={1}
      borderColor={grey[300]}
      width={'60%'}
    >
      <Stack direction={'column'}>
        <Typography variant='body2'>
          請求合計
        </Typography>
        <Divider />
        {summary.map((item) => {
          return (
            <AmountInfo
              label={item.label}
              value={item.value}
              key={item.label}
              labelVariant={item.labelVariant}
              valueVariant={item.valueVariant}
              justifyContent={'space-evenly'}
              hasUnderLine={false}
              width='60%'
            />
          );
        })}
      </Stack>
    </Box>
  );
};
