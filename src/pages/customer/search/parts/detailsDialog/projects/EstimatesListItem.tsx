import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Caption, LabeledInfo } from '../../../../../../components/ui/typographies';
import { dateStrToJA } from '../../../../../../helpers/utils';
import { useCalcEstimate } from '../../../../../../hooks/useCalcEstimate';

export const EstimatesListItem = ({
  estimateRecord,
}: {
  estimateRecord: Estimates.main.SavedData
}) => {
  const { 作成日時: createdDate } = estimateRecord;
  const {
    totalAmountInclTax,
  } = useCalcEstimate(estimateRecord);

  return (
    <Card variant='outlined'>
      <CardContent>
        <Stack spacing={1}>

        </Stack>
        <Typography variant='h5' textAlign={'right'}>
          {`${totalAmountInclTax?.toLocaleString() || 0} 円`}
        </Typography>
        <Caption text={`${dateStrToJA(createdDate.value)}`} />

      </CardContent>
    </Card>
  );
};