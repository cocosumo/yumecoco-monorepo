import { Box, FormLabel, Slider, Stack } from '@mui/material';
import { KeyOfForm } from '../../form';
import { useState } from 'react';
import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useFormContext } from 'react-hook-form';
import { grey } from '@mui/material/colors';

const [fromField, toField ]: KeyOfForm[] = ['amountFrom', 'amountTo'];

export const AmountRange = ({
  min = -2000,
  max = 50000000,
}: {
  min?: number,
  max?: number,
}) => {

  const {
    register,
  } = useFormContext();

  const [value, setValue] = useState<number[]>([min, max]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };


  return (
    <Box>
      <FormLabel>
        金額
      </FormLabel>
      <Box px={4}>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelFormat={(val) => `${val.toLocaleString()} 円`}
          valueLabelDisplay="auto"
          min={min}
          max={max}
        />
      </Box>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <OutlinedMoneyInput fullWidth {...register(fromField)} />
        <DoubleArrowIcon htmlColor={grey[700]} />
        <OutlinedMoneyInput fullWidth {...register(toField)} />
      </Stack>

    </Box>

  );
};