import { Stack } from '@mui/material';
import { ConstructionDates } from '../parts/ConstructionDates';
import { ControlledDatePicker } from '../fields/ControlledDatePicker';

export const ConstructionPeriods = ({
  disabled,
}: {
  disabled: boolean,
}) => {

  return (
    <Stack spacing={4} maxWidth={600}>
      <ConstructionDates
        disabled={disabled}
        label='着手'
        dateFldName='startDate'
        daysFldName='startDaysAfterContractDate'
      />
      <ConstructionDates 
        disabled={disabled}
        label='完成'
        dateFldName='finishDate'
        daysFldName='finishDaysAfterContractDate'
      />
      <ControlledDatePicker label='引き渡し日' name={'deliveryDate'} variant='outlined' />

      <ControlledDatePicker 
        disabled={disabled}
        label='契約日(必須)' 
        name={'contractDate'} 
        variant='outlined'
        emphasized
      />

    </Stack>
  );
};