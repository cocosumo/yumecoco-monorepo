import { Chip, Stack, SvgIconTypeMap, Typography } from '@mui/material';

import { format, parseISO } from 'date-fns';
import { useCalcEstimate } from '../../../../hooks/useCalcEstimate';

import NumbersIcon from '@mui/icons-material/Numbers';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import { OverridableComponent } from '@mui/types';


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
  estimateRecord: Estimates.main.SavedData
}) => {

  const {
    $id: id,
    作成日時: { value: dateCreated },
    estimateStatus: { value: estimateStatus },
    envStatus: { value: envStatus },
  } = estimateRecord;

  const { totalAmountInclTax } = useCalcEstimate(estimateRecord);


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
        explanation={Math.round(totalAmountInclTax).toLocaleString()}
      />

    </Stack>
  );
};
