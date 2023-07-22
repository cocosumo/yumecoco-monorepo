import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { generateReading } from 'kokoas-client/src/api/ai/generateReading';

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
  const qc = useQueryClient();

  const handleSetReading = useMemo( () =>
    debounce(async (text: string) => {
      setIsAILoading(true);
      const result = await qc.fetchQuery(
        ['generateReading', text],
        () => generateReading(text),
        {
          staleTime: 1000 * 60 * 60 * 24,
        },
      );

      const newReading = result?.choices[0]?.text || '';
      
      setValue(`customers.${index}.custNameReading`, newReading);
      setIsAILoading(false);
    }, 1000), 
  [
    qc,
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
      }) => {
        return (
          <TextField
            label='氏名'
            size='small'
            {...otherField}
            inputRef={ref}
            placeholder='山田　太郎'
            required
            onChange={async (e) => {
              const newValue = e.target.value;
              handleSetReading(newValue);
              onChange(newValue);
            }}
          />
        );
      }}
    />
  );
};