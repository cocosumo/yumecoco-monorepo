import { Box, FormLabel, Slider, Stack } from '@mui/material';
import { KeyOfForm } from '../../form';
import { useState } from 'react';
import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';


export const AmountRange = ({
  min = -2000,
  max = 50000000,
}: {
  min?: number,
  max?: number,
}) => {
  const [fromField, toField ]: KeyOfForm[] = ['amountFrom', 'amountTo'];

  const [value, setValue] = useState<number[]>([-2000, 9000000]);

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
        <OutlinedMoneyInput fullWidth name={fromField} />
        <DoubleArrowIcon />
        <OutlinedMoneyInput fullWidth name={toField} />
      </Stack>

    </Box>

  );
};