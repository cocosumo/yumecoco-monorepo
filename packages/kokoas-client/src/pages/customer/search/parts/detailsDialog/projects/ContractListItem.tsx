import { Button, Card, CardActions, CardContent, Chip, Stack, useTheme } from '@mui/material';
import {
  LabeledDetail,
} from 'kokoas-client/src/components';
import { jaEnvelopeStatus } from 'kokoas-client/src/lib';
import { calcBeforeTax, calcProfitRate } from 'libs';
import { useMemo } from 'react';
import { IContracts, TEnvelopeStatus } from 'types';
import { dateStrToJA } from '../../../../../../helpers/utils';
import { Link } from 'react-router-dom';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from 'kokoas-client/src/pages/Router';


export const ContractListItem = ({
  record,
}: {
  record: IContracts
}) => {
  const {
    作成日時: createdDate,
    envelopeStatus,
    totalContractAmt,
    totalProfit,
    tax,
    uuid: contractId,
  } = record;

  const { typography: { caption } } = useTheme();

  const profitRate = useMemo(() => {
    const beforeTax = calcBeforeTax(+totalContractAmt.value, +tax.value);
    const costPrice = beforeTax - (+totalProfit.value);
    return calcProfitRate(costPrice, beforeTax);
  }, [
    totalContractAmt.value, 
    totalProfit.value,
    tax.value,
  ]);

  return (
    <Card variant='outlined'>
      <CardContent sx={{ p: 1 }}>
        <Stack
          direction={'row'}
          spacing={1}
          mb={1}
          minHeight={'20px'}
        >
          {envelopeStatus.value && (
          <Chip
            size='small'
            variant='outlined'
            color="primary"
            label={jaEnvelopeStatus(envelopeStatus.value as TEnvelopeStatus).ja}
          />)}

        </Stack>
        <Stack direction={'column'} spacing={0} alignItems="flex-end">
          <LabeledDetail
            label='契約金額'
            value={`${(+totalContractAmt.value)?.toLocaleString() || 0} 円`}
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
            value={`${+(totalProfit.value)?.toLocaleString() || 0} 円`}

          />
          <LabeledDetail
            label='粗利率'
            value={`${((profitRate || 0) * 100).toFixed(2)} %`}
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

        </Stack>
      </CardContent>
      <CardActions>
        <Link to={`${pages.projContractPreviewV2}?${generateParams({ contractId: contractId.value, menuOpen: +false })}`}>
          <Button variant='outlined' fullWidth>
            契約を見る
          </Button>
        </Link>
      </CardActions>

    </Card>
  );
};