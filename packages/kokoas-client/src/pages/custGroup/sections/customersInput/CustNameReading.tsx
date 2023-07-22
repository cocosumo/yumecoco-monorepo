import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { TextField } from '@mui/material';

export const CustNameReading = ({
  index,
}:{
  index: number
}) => {

  const { 
    control,
  } = useTypedFormContext();

  
  return (
    <Controller
      name={`customers.${index}.custNameReading`}
      control={control}
      render={({
        field: {
          ref,
          onChange,
          ...otherField
        },
        fieldState:{ 
          error,
          isTouched,
        },
        formState: {
          isSubmitted,
        },
      }) => {
        const showError = (isSubmitted || isTouched) && !!error;

        return (
          <TextField
            label='氏名フリガナ'
            placeholder='ヤマダ　タロウ'
            size='small'
            {...otherField}
            inputRef={ref}
            required
            onChange={async (e) => {
              const newValue = e.target.value;
              onChange(newValue);
            }}
            error={showError}
            helperText={showError 
              ? error?.message 
              : 'フリガナはAIにより生成されており、正確でない可能性があります。必要に応じて修正してください。実験段階で当機能は撤回される場合がございます。2023年7月22日18時に実装されました。'}
              //: ''}
          />
        );
      }}
    />
  );
};