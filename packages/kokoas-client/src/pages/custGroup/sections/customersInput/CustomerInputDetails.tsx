import { Stack } from '@mui/material';
import { ControlledTextField } from '../../fields/ControlledTextField';
import { SelectGender } from './SelectGender';

export const CustomerInputDetails = ({
  index,
}: {
  index: number,
}) => {

  return (
    <Stack
      spacing={2}
    >
      <ControlledTextField 
        name={`customers.${index}.${'custName'}`}
        label='氏名'
        placeholder='山田　太郎'
        maxWidth={450}
      />

      <ControlledTextField 
        name={`customers.${index}.${'custNameReading'}`}
        label='氏名フリガナ'
        placeholder='ヤマダ　タロウ'
        maxWidth={450}
      />

      <Stack
        direction={'row'}
        spacing={2}
      >
        <SelectGender
          index={index}
        />

      </Stack>


    </Stack>
  );
};