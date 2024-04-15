import { 
  FormControl, 
  FormControlLabel, 
  FormLabel, 
  Radio, 
  RadioGroup, 
} from '@mui/material';
import { useOrderFormContext } from '../../hooks/useOrderRHF';
import { Controller } from 'react-hook-form';

export const OrderMethodChoices = () => {
  const { control } = useOrderFormContext();

  return (
    <Controller
      name={'orderMethod'}
      control={control}
      render={({ field }) => (
        <FormControl
          required
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <FormLabel>
            発注方法
          </FormLabel>
          <RadioGroup
            row
            {...field}
          >
            <FormControlLabel value="print" control={<Radio />} label="印刷" />
            <FormControlLabel value="email" control={<Radio />} label="メール" />
          </RadioGroup>
        </FormControl>
      )}

    />
   
  );
};