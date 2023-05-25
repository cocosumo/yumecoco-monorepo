import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { calculateAmount } from 'libs';

const taxRates = [
  {
    label: '8%',
    value: 0.08,
  },
  {
    label: '10%',
    value: 0.1,
  },
];

export const TaxRate = () => {

  const { control, setValue, getValues } = useFormContext<TypeOfForm>();

  return (
    <Controller
      name={'taxRate'}
      control={control}
      render={({
        field: {
          onChange,
          value,
          name,
        },
  
      }) => {
        return (
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              税率
            </FormLabel>
            <RadioGroup
              value={value}
              name={name}
              row
              onChange={(_, newVal) => {
                onChange(newVal);

                const totalContractAmtAfterTax = getValues('totalContractAmtAfterTax');
                const profitRate = getValues('profitRate');

                const {
                  amountBeforeTax,
                  profit,
                } = calculateAmount({
                  taxRate: +newVal,
                  amountAfterTax: totalContractAmtAfterTax,
                  profitRate: profitRate / 100,
                });

                setValue('totalContractAmtBeforeTax', amountBeforeTax || 0);
                setValue('totalProfit', profit || 0);

              }}
            >
              {taxRates.map((taxRate) => (
                <FormControlLabel
                  key={taxRate.value}
                  value={taxRate.value}
                  control={<Radio />}
                  label={taxRate.label}
                />
              ))}

            </RadioGroup>
          </FormControl>
        );
      }}
    />
  );
};