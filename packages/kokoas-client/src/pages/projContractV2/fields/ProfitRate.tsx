import { Controller } from 'react-hook-form';
import { InputAdornment, TextField } from '@mui/material';
import { calculateAmount } from 'libs';
import { useFormContextExtended } from '../hooks/useFormContextExtended';

export const ProfitRate = ({
  disabled = false,
}: {
  disabled?: boolean,
}) => {

  const {
    setRoundedValue,
    control,
    getValues,
  } = useFormContextExtended();

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
            size='small'
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={(e) => {
              const profitRate = +e.target.value;
              onChange(typeof profitRate === 'number' ? profitRate : e);

              if (!isNaN(profitRate)) {
                
                const totalContractAmtAfterTax = getValues('totalContractAmtAfterTax');
                const taxRate = getValues('taxRate');

                const {
                  amountBeforeTax,
                  profit,                  
                  costPrice,
                } = calculateAmount({
                  taxRate: taxRate,
                  amountAfterTax: totalContractAmtAfterTax,
                  profitRate: profitRate / 100,
                });

                setRoundedValue('totalContractAmtBeforeTax', amountBeforeTax || 0);
                setRoundedValue('totalProfit', profit || 0);
                setRoundedValue('costPrice', costPrice || 0);
              } else {
                onChange(e.target.value as unknown as number);
              }
             
            }}
            onBlur={onBlur}
            error={!!error}
            disabled={disabled}
            placeholder={'12.34'}
            helperText={error?.message || '粗利率を入れても自動計算出来ます'}
            inputProps={{ 
              style: { 
                textAlign: 'right', 
              }, 
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' disablePointerEvents>
                  %
                </InputAdornment>
              ),
            }}
            sx={{
              width: 300,
            }}
          />
        );
      }}
    />
  );
};