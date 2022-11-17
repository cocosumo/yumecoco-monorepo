import { Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import { IProjestimates } from 'types';
import { Caption } from '../../../../../../components/ui/typographies';
import { dateStrToJA } from '../../../../../../helpers/utils';
import { useCalcEstimate } from '../../../../../../hooks/useCalcEstimate';
import { EstimateButton } from './EstimateButton';


export const EstimatesListItem = ({
  estimateRecord,
}: {
  estimateRecord: IProjestimates
}) => {
  const {
    作成日時: createdDate,
    projId : { value: projId },
    $id: { value: projEstimateId },
    envStatus: { value: envStatus },
    estimateStatus: { value: estimateStatus },
  } = estimateRecord;
  const {
    totalAmountInclTax,
  } = useCalcEstimate(estimateRecord);

  return (
    <Card variant='outlined'>
      <CardContent sx={{ p: 1 }}>
        <Stack direction={'row'} spacing={1} mb={1}>
          {envStatus && (
          <Chip
            size='small'
            variant='outlined'
            color="primary"
            label={envStatus}
          />)}
          {estimateStatus && (
          <Chip
            size='small'
            variant='outlined'
            color="success"
            label={estimateStatus}
          />)}
        </Stack>
        <Stack direction={'column'} spacing={0} alignItems="flex-end">
          <Typography variant='h5' textAlign={'right'} component="span">
            {`${totalAmountInclTax?.toLocaleString() || 0} 円`}
          </Typography>
          <Caption text={`${dateStrToJA(createdDate.value)}`} />

        </Stack>
      </CardContent>
      <CardActions>
        <EstimateButton projId={projId} projEstimateId={projEstimateId} isSmall />
      </CardActions>

    </Card>
  );
};