import { 
  FormControl, 
  FormControlLabel, 
  FormHelperText, 
  FormLabel, 
  Radio, 
  RadioGroup, 
} from '@mui/material';
import { useOrderFormContext } from '../../hooks/useOrderRHF';
import { Controller } from 'react-hook-form';
import { orderMethodChoices } from '../../schema';

export const OrderMethodChoices = () => {
  const { control } = useOrderFormContext();

  return (
    <Controller
      name={'orderMethod'}
      control={control}
      render={({ 
        field,
        fieldState: { error },
      }) => (
        <FormControl
          required
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px',
          }}
          error={!!error}
        >
          <FormLabel>
            発注方法
          </FormLabel>
          <RadioGroup
            row
            {...field}
          >
            {orderMethodChoices.map((choice) => (
              <FormControlLabel
                key={choice}
                value={choice}
                control={<Radio />}
                label={choice}
              />
            ))}
          </RadioGroup>
          <FormHelperText>
            {error?.message}
          </FormHelperText>
        </FormControl>
      )}

    />
   
  );
};