import { Tooltip, styled } from '@mui/material';
import { useSaveProject } from 'kokoas-client/src/hooksQuery';
import { DateField } from '@mui/x-date-pickers/DateField';
import parseISO from 'date-fns/parseISO';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { format } from 'date-fns/esm';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { useSaveReceivableCompleteDate } from './useSaveReceivableCompleteDate';

const StyledDateField = styled(DateField)(() => ({

  '& .MuiInputBase-input': {
    padding: '4px',
    fontSize: '12px',
  },

}));


export const ReceivableCompleteDate = ({
  projId,
  receivableCompleteDate,
}:{
  projId: string,
  receivableCompleteDate: string,
}) => {
  const [value, setValue] = useState<Date | null>(receivableCompleteDate ? parseISO(receivableCompleteDate) : null);
  const [error, setError] = useState<string | null>(null);

  const { mutate, isLoading, isSuccess } = useSaveReceivableCompleteDate();

  const debouncedSave = useDebouncedCallback(()=>{
    mutate({
      projId,
      record: {
        receivableCompleteDate: {
          value: format(value as Date, 'yyyy-MM-dd'),
        },
      },
    });
  }, 1000);

  console.log('isLoading', projId, value, isLoading, isSuccess);

  return (
    <Tooltip open={!!error} title={!!error && '正しい日付を入力してください'}>
      <StyledDateField 
        hiddenLabel 
        value={value}
        format={'yyyy-MM-dd'}
        onChange={(newValue, validation) => {
          setValue(newValue as Date);
         
          if (validation.validationError) {
            setError(validation.validationError);
            return;
          } else {
            debouncedSave();
            setError(null);
          }
        }}
        onBlur={() => setError(null)}
      />
    </Tooltip>

  );
};