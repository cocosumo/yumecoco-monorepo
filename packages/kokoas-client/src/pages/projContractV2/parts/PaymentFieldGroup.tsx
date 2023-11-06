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

  const envelopeStatus = useWatch<TypeOfForm>({
    name: 'envelopeStatus',
  });

  const hasContract = !!envelopeStatus;


  const { 
    chkFldName, 
    amtFldName, 
    dateFldName, 
  } = fieldNames;

  const { 
    control, 
    register, 
    setValue, 
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
        disabled={hasContract}
        control={(
          <Checkbox
            checked={isChecked as boolean}
            {...register(chkFldName, {
              onChange: (e) => {
                if (!e.target.checked) { // チェックを外したら、
                  // 金額をクリアする
                  setValue(amtFldName, 0);

                  // エラーがあれば、日付をクリアする
                  const { error: dateFldErr } = getFieldState(dateFldName);

                  if (dateFldErr) {
                    setValue(dateFldName, null, { shouldValidate: true });
                  }
                } else {
                  
                  // チェックを入れたら、残額を計算して、金額にセットする
                  const [
                    initialAmt,
                    interimAmt,
                    contractAmt,
                    finalAmt,
                    othersAmt,
                    totalContractAmt,
                  ] = getValues([
                    'initialAmt', 
                    'interimAmt', 
                    'contractAmt', 
                    'finalAmt',
                    'othersAmt',
                    'totalContractAmtAfterTax',
                  ]);

                  const amt = (initialAmt ?? 0) 
                  + (interimAmt ?? 0) 
                  + (contractAmt ?? 0) 
                  + (finalAmt ?? 0)
                  + (othersAmt ?? 0);
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
        disabled={!isChecked || hasContract}
      />
      <ControlledDatePicker 
        name={dateFldName}
        disabled={!isChecked}
      />
    </Stack>
  );
};