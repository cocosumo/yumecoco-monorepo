import { Card, CardActions, CardContent, Chip, Stack } from '@mui/material';
import { calculateEstimateRecord } from 'api-kintone';
import {
  LabeledDetail,
} from 'kokoas-client/src/components';
import { jaEnvelopeStatus } from 'kokoas-client/src/lib';
import { formatDataId } from 'libs';
import { useMemo } from 'react';
import { IProjestimates, TEnvelopeStatus } from 'types';
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

  const { summary : {
    totalAmountAfterTax,
    totalProfit,
    overallProfitRate,
  } } = useMemo(() => {
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
          <LabeledDetail
            label='契約金額'
            value={`${totalAmountAfterTax?.toLocaleString() || 0} 円`}
            typographyProps={{
              fontSize: 20,
            }}
          />
          <LabeledDetail
            label='粗利額'
            value={`${totalProfit?.toLocaleString() || 0} 円`}
          />
          <LabeledDetail
            label='粗利率'
            value={`${(overallProfitRate || 0) * 100} %`}
          />
          <LabeledDetail
            label='作成日'
            value={`${dateStrToJA(createdDate.value)}`}
          />
          <LabeledDetail
            label='ID'
            value={formatDataId(dataId.value)}
          />

        </Stack>
      </CardContent>
      <CardActions>
        <EstimateButton projId={projId.value} projEstimateId={uuid.value} isSmall />
      </CardActions>

    </Card>
  );
};