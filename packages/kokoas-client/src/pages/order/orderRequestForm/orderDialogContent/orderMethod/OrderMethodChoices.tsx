import { 
  FormControl, 
  FormControlLabel, 
  FormLabel, 
  Radio, 
  RadioGroup, 
} from '@mui/material';

export const OrderMethodChoices = () => {
  return (
    <FormControl
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
      >
        <FormControlLabel value="print" control={<Radio />} label="印刷" />
        <FormControlLabel value="email" control={<Radio />} label="メール" />
      </RadioGroup>
    </FormControl>
  );
};