import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { CircularProgress, InputAdornment, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { askForReading } from 'kokoas-client/src/api/ai/askForReading';

export const CustName = ({
  index,
}:{
  index: number
}) => {
  const [isAILoading, setIsAILoading] = useState(false);

  const { 
    control,
    setValue,
  } = useTypedFormContext();

  const handleSetReading = useMemo( () =>
    debounce(async (text: string) => {
      setIsAILoading(true);
      setTimeout(async () => {
        const result = await askForReading(text);

        const newReading = result?.choices[0].message?.content || '';
      
        setValue(`customers.${index}.custNameReading`, newReading);
        setIsAILoading(false);

      }, 
      1000);

    }, 1500), 
  [
    setValue,
    index,
  ]);

  
  return (
    <Controller
      name={`customers.${index}.custName`}
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
            label='氏名'
            size='small'
            {...otherField}
            inputRef={ref}
            placeholder='山田　太郎'
            required
            error={showError}
            onChange={async (e) => {
              const newValue = e.target.value;
              handleSetReading(newValue);
              onChange(newValue);
            }}
            InputProps={{
              endAdornment: isAILoading 
                ? <InputAdornment
                    position='end'
                  
                  >
                  AIで読みを生成中...
                  <CircularProgress size={18} />
                </InputAdornment> 
                : null,
            }}
            helperText={showError
              ? error?.message
              : ''}
          />
        );
      }}
    />
  );
};