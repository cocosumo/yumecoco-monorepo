import { Chip, Stack, SvgIconTypeMap, Typography } from '@mui/material';

import { format, parseISO } from 'date-fns';

import NumbersIcon from '@mui/icons-material/Numbers';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import { OverridableComponent } from '@mui/types';
import { IProjestimates } from 'types';
import { useMemo } from 'react';
import { calculateEstimateRecord } from 'api-kintone';


const ListContent = ({
  Icon,
  explanation,
}: {
  Icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>,
  explanation: string
}) => {
  return (
    <Stack spacing={0} direction={'row'}>
      <Icon />
      <Typography>
        {explanation}
      </Typography>
    </Stack>
  );
};


export const ListItemEstimate = ({
  estimateRecord,
}: {
  estimateRecord: IProjestimates
}) => {

  const {
    $id: id,
    作成日時: { value: dateCreated },
    estimateStatus: { value: estimateStatus },
    envStatus: { value: envStatus },
  } = estimateRecord;
  
  const { estimateSummary : { totalAmountAfterTax } } = useMemo(() => {
    return calculateEstimateRecord({ record: estimateRecord });
  }, [estimateRecord]);


  return (
    <Stack direction={'row'} spacing={2}
      alignItems="center" justifyContent="space-around"
    >

      <Stack width={'40%'} spacing={1} direction={'row'}>

        {!!estimateStatus &&
          <Chip label={estimateStatus} color={'info'} size={'small'} />}

        {!!envStatus &&
          <Chip label={'契約'} color={'success'} size={'small'} />}

      </Stack>

      <ListContent Icon={NumbersIcon} explanation={String(id.value)} />

      <ListContent Icon={ScheduleIcon} explanation={format(parseISO(dateCreated), 'yyyy/MM/dd')} />

      <ListContent
        Icon={CurrencyYenIcon}
        explanation={Math.round(totalAmountAfterTax).toLocaleString()}
      />

    </Stack>
  );
};
