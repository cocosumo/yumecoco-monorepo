import { Tooltip, styled } from '@mui/material';
import { useSaveProject } from 'kokoas-client/src/hooksQuery';
import { DateField } from '@mui/x-date-pickers/DateField';
import parseISO from 'date-fns/parseISO';
import { useState } from 'react';

const StyledDateField = styled(DateField)(() => ({

  '& .MuiInputBase-input': {
    padding: '4px',
    fontSize: '12px',
  },

}));


export const ReceivableCompleteDate = ({
  receivableCompleteDate,
}:{
  projId: string,
  receivableCompleteDate: string,
}) => {
  const [error, setError] = useState<string | null>(null);
  const { mutate } = useSaveProject();

  

  return (
    <Tooltip open={!!error} title={!!error && '正しい日付を入力してください'}>
      <StyledDateField 
        hiddenLabel 
        value={receivableCompleteDate ? parseISO(receivableCompleteDate) : null}
        format={'yyyy-MM-dd'}
        onChange={(value, validation) => {
          console.log('value', value);
          if (validation.validationError) {
            setError(validation.validationError);
            return;
          } else {
            setError(null);
          }
        }}
        onBlur={() => setError(null)}
      />
    </Tooltip>

  );
};