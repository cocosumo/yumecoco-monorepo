import { Chip, MenuItem, Stack } from '@mui/material';

import { format, parseISO } from 'date-fns';
import { useCalcEstimate } from '../../../../hooks/useCalcEstimate';

import NumbersIcon from '@mui/icons-material/Numbers';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';



export const ListEstimate = ({
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
    <MenuItem>
      {!!estimateStatus &&
      <Chip label={estimateStatus} color={'info'} size={'small'} />}

      {!!envStatus &&
      <Chip label={'契約'} color={'success'} size={'small'} />}

      <NumbersIcon />
      {id}

      <ScheduleIcon />
      {format(parseISO(dateCreated), 'yy/MM/dd')}

      <CurrencyYenIcon />
      {totalAmountInclTax}
    </MenuItem>
  );
};
