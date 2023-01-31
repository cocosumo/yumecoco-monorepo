import { Slider } from '@mui/material';
import isArray from 'lodash/isArray';
import { useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../form';

export const AmountRangeSlider = ({
  min = -2000,
  max = 50000000,
}: {
  min?: number,
  max?: number,
}) => {

  const {
    control,
    setValue,
  } = useFormContext<TypeOfForm>();

  const [amountFrom, amountTo] = useWatch({
    name: [
      'amountFrom',
      'amountTo',
    ],
    control,
  });

  return (
    <Slider
      value={[+amountFrom ?? min, +amountTo ?? max]}
      onChange={(_: Event, newVal) => {
        if (isArray(newVal)) {
          const [newAmountFrom, newAmountTo] = newVal;
          setValue('amountFrom', newAmountFrom);
          setValue('amountTo', newAmountTo);
        }

      }}
      valueLabelFormat={(val) => `${val.toLocaleString()} 円`}
      valueLabelDisplay="auto"
      min={min}
      max={max}
    />
  );
};