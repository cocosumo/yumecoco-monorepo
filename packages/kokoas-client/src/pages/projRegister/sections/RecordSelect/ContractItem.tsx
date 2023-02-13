import { Button, Stack, Typography } from '@mui/material';
import { formatDataId } from 'libs';

export const ContractItem = ({
  totalAmountAfterTax,
  dataId,
}: {
  totalAmountAfterTax: number,
  totalProfit: number,
  overallProfitRate: number,
  dataId: string,
  selected: boolean
}) => {
  return (
    <Button fullWidth>
      <Stack>


        <Typography variant={'h5'}>
          {`${totalAmountAfterTax.toLocaleString()} 円`}
        </Typography>
        <Typography variant={'caption'}>
          {formatDataId(dataId)}
        </Typography>
      </Stack>
    </Button>
  );
};