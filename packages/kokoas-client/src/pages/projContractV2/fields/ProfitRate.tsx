import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { InputAdornment, TextField } from '@mui/material';
import { calculateAmount } from 'libs';

export const ProfitRate = ({
  disabled,
}: {
  disabled: boolean,
}) => {
  const { control, setValue, getValues } = useFormContext<TypeOfForm>();

  return (
    <Controller
      name={'profitRate'}
      control={control}
      render={({
        field: {
          onBlur,
          onChange,
          ref,
          value,
          name,
        },
        fieldState: {
          error,
        },
        
      }) => {

        return (
          <TextField
            label={'粗利率'}
            inputRef={ref}
            value={value}
            name={name}
            variant={'outlined'}
            type='number'
            onChange={(e) => {
             

              const profitRate = +e.target.value;
             
              if (!isNaN(profitRate)) {
                onChange(profitRate);
                const totalContractAmtAfterTax = getValues('totalContractAmtAfterTax');
                const taxRate = getValues('taxRate');

                const {
                  amountBeforeTax,
                  profit,
                } = calculateAmount({
                  taxRate: taxRate,
                  amountAfterTax: totalContractAmtAfterTax,
                  profitRate: profitRate / 100,
                });

                setValue('totalContractAmtBeforeTax', amountBeforeTax || 0);
                setValue('totalProfit', profit || 0);
              }
             
            }}
            onBlur={onBlur}
            error={!!error}
            disabled={disabled}
            placeholder={'12.34'}
            helperText={error?.message}
            inputProps={{ 
              style: { textAlign: 'right' }, 
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' disablePointerEvents>
                  %
                </InputAdornment>
              ),
            }}
          />
        );
      }}
    />
  );
};