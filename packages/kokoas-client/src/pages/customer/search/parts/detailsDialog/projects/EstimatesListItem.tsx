import { Card, CardActions, CardContent, Chip, Stack, useTheme } from '@mui/material';
import { fontSize } from '@mui/system';
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

  const { typography: { caption } } = useTheme();

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
            labelProps={{
              sx: {
                fontSize: 20,
              },
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
            typographyProps={{
              variant: 'caption',
            }}
            labelProps={{
              sx: {
                fontSize: caption.fontSize,
              },
            }}
          />
          <LabeledDetail
            label='ID'
            value={formatDataId(dataId.value)}
            typographyProps={{
              variant: 'caption',
            }}
            labelProps={{
              sx: {
                fontSize: caption.fontSize,
              },
            }}
          />

        </Stack>
      </CardContent>
      <CardActions>
        <EstimateButton projId={projId.value} projEstimateId={uuid.value} isSmall />
      </CardActions>

    </Card>
  );
};