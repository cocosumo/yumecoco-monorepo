import { Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import { calculateEstimateRecord } from 'api-kintone';
import { jaEnvelopeStatus } from 'kokoas-client/src/lib';
import { useMemo } from 'react';
import { IProjestimates, TEnvelopeStatus } from 'types';
import { Caption } from '../../../../../../components/ui/typographies';
import { dateStrToJA } from '../../../../../../helpers/utils';
import { EstimateButton } from './EstimateButton';


export const EstimatesListItem = ({
  estimateRecord,
}: {
  estimateRecord: IProjestimates
}) => {
  const {
    作成日時: createdDate,
    projId,
    uuid,
    dataId,
    envStatus,
    estimateStatus,
  } = estimateRecord;

  const { estimateSummary : { totalAmountAfterTax } } = useMemo(() => {
    return calculateEstimateRecord({ record: estimateRecord });
  }, [estimateRecord]);

  return (
    <Card variant='outlined'>
      <CardContent sx={{ p: 1 }}>
        <Stack direction={'row'} spacing={1} mb={1}>
          {envStatus.value && (
          <Chip
            size='small'
            variant='outlined'
            color="primary"
            label={jaEnvelopeStatus(envStatus.value as TEnvelopeStatus).ja}
          />)}
          {estimateStatus.value && (
          <Chip
            size='small'
            variant='outlined'
            color="success"
            label={estimateStatus.value}
          />)}
        </Stack>
        <Stack direction={'column'} spacing={0} alignItems="flex-end">
          <Typography variant='h5' textAlign={'right'} component="span">
            {`${totalAmountAfterTax?.toLocaleString() || 0} 円`}
          </Typography>
          <Caption text={`${dateStrToJA(createdDate.value)}`} />
          <Caption text={dataId.value} />

        </Stack>
      </CardContent>
      <CardActions>
        <EstimateButton projId={projId.value} projEstimateId={uuid.value} isSmall />
      </CardActions>

    </Card>
  );
};