import { Stack } from '@mui/material';
import { ConstructionDates } from '../parts/ConstructionDates';

export const ConstructionPeriods = () => {

  return (
    <Stack spacing={2}>
      <ConstructionDates
        label='着手'
        dateFldName='startDate'
        daysFldName='startDaysAfterContractDate'
      />
      <ConstructionDates 
        label='完成'
        dateFldName='finishDate'
        daysFldName='finishDaysAfterContractDate'
      />
    </Stack>
  );
};