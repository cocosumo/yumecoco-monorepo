import { Stack, Typography } from '@mui/material';
import { ControlledCurrencyField } from '../../fields/ControlledCurrencyField';
import { Rank } from './Rank';
import { ControlledDatePicker } from '../../fields/ControlledDatePicker';
import { ControlledTextField } from '../../fields/ControlledTextField';
import { RealEstateStatus } from './RealEstateStatus';
import { EstatePurchaseDate } from './EstatePurchaseDate';

export const Prospect = () => {

  return (
    <Stack 
      spacing={2}
      maxWidth={600}
    >
      <Stack
        direction='row'
        spacing={2}
        justifyContent={'space-between'}
      >
        <Rank />

        <ControlledCurrencyField 
          name="schedContractPrice"
          width={400}
        />

        <ControlledTextField
          name='paymentMethod'
        />


      </Stack>

      <Stack
        direction='row'
        spacing={2}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          bgcolor: 'background.paper',
          p: 1,
          px: 2,
          border: '1px solid #ced4da',
          borderRadius: 1,
        }}
      >
        <RealEstateStatus />
        <Typography 
          variant='caption'
          color={'text.secondary'}
        >
          会議資料に反映されます。
          <br />
          正確に入力してください。
        </Typography>
      </Stack>

      <Stack 
        spacing={2}
        direction='row'
      >
        <EstatePurchaseDate />

        <ControlledDatePicker
          name='planApplicationDate'
        />
        <ControlledDatePicker
          name='schedContractDate'
        />
      </Stack>
    </Stack>
  );
};