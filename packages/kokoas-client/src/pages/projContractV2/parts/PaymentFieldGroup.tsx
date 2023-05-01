import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { ControlledCurrencyInput } from '../fields/ControlledCurrencyInput';
import { ControlledDatePicker } from '../fields/ControlledDatePicker';
import { KeyOfForm } from '../form';
import { useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';


export const PaymentFieldGroup = (
  {
    fieldNames,
    label,
  }: {
    label: string,
    fieldNames: {
      chkFldName: KeyOfForm,
      amtFldName: KeyOfForm,
      dateFldName: KeyOfForm,
    }
  },
) => {

  const { 
    chkFldName, 
    amtFldName, 
    dateFldName, 
  } = fieldNames;

  const { 
    control, 
    register, 
    setValue, 
    resetField,
    getFieldState,
    getValues,
  } = useFormContext<TypeOfForm>();
  
  const isChecked = useWatch({
    name: chkFldName,
    control,
  });

  return (
    <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
      <FormControlLabel
        label={label}
        name={chkFldName}
        control={(
          <Checkbox
            checked={isChecked as boolean}
            {...register(chkFldName, {
              onChange: (e) => {
                if (!e.target.checked) { // チェックを外したら、
                 
                  // 金額をクリアする
                  resetField(amtFldName);

                  // エラーがあれば、日付をクリアする
                  const { error: dateFldErr } = getFieldState(dateFldName);
                  if (dateFldErr) {
                    resetField(dateFldName);
                  }
                } else {

                  // チェックを入れたら、残額を計算して、金額にセットする
                  const [
                    initialAmt,
                    interimAmt,
                    contractAmt,
                    finalAmt,
                    totalContractAmt,
                  ] = getValues([
                    'initialAmt', 
                    'interimAmt', 
                    'contractAmt', 
                    'finalAmt', 
                    'totalContractAmt',
                  ]);

                  const amt = (initialAmt ?? 0) + (interimAmt ?? 0) + (contractAmt ?? 0) + (finalAmt ?? 0);
                  const remainingAmt = totalContractAmt - amt;

                  setValue(amtFldName, remainingAmt, { shouldValidate: true });
                }
              },
            })}
            sx={{
              transform: 'scale(1.5)',
            }}
          />)}
      />
      <ControlledCurrencyInput 
        name={amtFldName} 
        variant='standard'
        disabled={!isChecked}
      />
      <ControlledDatePicker 
        name={dateFldName}
        disabled={!isChecked}
      />
    </Stack>
  );
};