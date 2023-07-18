import { Stack } from '@mui/material';
import { ControlledTextField } from '../../fields/ControlledTextField';
import { SelectGender } from './SelectGender';
import { Birthdate } from './birthdate/Birthdate';

export const CustomerInputDetails = ({
  index,
}: {
  index: number,
}) => {

  return (
    <Stack
      spacing={2}
      maxWidth={600}
    >
      <ControlledTextField 
        name={`customers.${index}.${'custName'}`}
        label='氏名'
        placeholder='山田　太郎'
      />

      <ControlledTextField 
        name={`customers.${index}.${'custNameReading'}`}
        label='氏名フリガナ'
        placeholder='ヤマダ　タロウ'
      />

      <Stack
        direction={'row'}
        spacing={2}
        alignItems={'flex-end'}
        justifyContent={'space-between'}
      >
        <SelectGender
          index={index}
        />

        <Birthdate 
          index={index}
        />

      </Stack>


    </Stack>
  );
};