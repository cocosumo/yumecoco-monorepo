import { FormGroup, FormLabel, InputAdornment, OutlinedInput, Stack } from '@mui/material';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { KForm } from '../../schema';

const AmountField = ({
  fieldName,
  suffix,
}:{
  fieldName: KForm;
  suffix: string;
}) => {
  const { register } = useTypedFormContext();

  return (
    <OutlinedInput 
      fullWidth
      size="small"
      {...register(fieldName)}
      inputProps={{
        style: {
          textAlign: 'right',
        },
      }}
      endAdornment={(<InputAdornment position="end">
        {suffix}
      </InputAdornment>)}
    />
  );
};


export const ContractAmt = () => {
  
  return (
    <FormGroup>
      <FormLabel>
        契約金額
      </FormLabel>
      <Stack 
        pt={1} 
        spacing={2} 
        direction={'row'}
      >
        <AmountField 
          fieldName='contractAmtFrom' 
          suffix='万円から'
        />
        <AmountField 
          fieldName='contractAmtFrom' 
          suffix='万円まで'
        />
      </Stack>
    </FormGroup>
  );
};