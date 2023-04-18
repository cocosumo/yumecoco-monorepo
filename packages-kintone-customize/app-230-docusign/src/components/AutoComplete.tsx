import { Autocomplete, TextField } from '@mui/material';
import { setFieldValue } from 'api-kintone';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

export interface AutoCompleteOption {
  label: string,
  id: string,
}

/**
 * 
 * @param param0 
 * @param param0.label　ラベル
 * @param param0.initialValue 初期値
 * @param param0.fetchOptions optionsを取得するプロミス関数
 * @param param0.fieldId　KintoneのフィールドID. ジェネリックで型を指定出来る
 * 
 */
export function AutoLookup({
  label,
  initialValue,
  fetchOptions,
  fieldId,
} : {
  label: string,
  initialValue?: AutoCompleteOption,
  fetchOptions: () => Promise<AutoCompleteOption[]>,
  fieldId: keyof DB.SavedRecord,
}) {
  const [inputValue, setInputValue] = useState<string>('');
  const [value, setValue] = useState<AutoCompleteOption | null>(initialValue ?? null);
  const [options, setOptions] = useState<AutoCompleteOption[]>([]);

  const debouncedValue = useDebounce(inputValue, 1000);
  
  const handleOpen = async () => {
    const newOptions = await fetchOptions();
    setOptions(newOptions);
  };
  
  useEffect(()=>{
    if (debouncedValue) {
      console.log('ras', debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <Autocomplete
      disablePortal
      value={value}
      onOpen={handleOpen}
      options={options}
      onInput={(e) => {
        setInputValue((e.target as HTMLInputElement).value);
      }}
      onChange={(_, newValue) => {
        setValue(newValue);
        setFieldValue(fieldId, newValue?.id ?? '');
      }}
      sx={{ width: 300 }}
      renderInput={({ InputProps, ...params }) => (
        <TextField 
          {...params} 
          label={label}
          size='small' 
          InputProps={{
            ...InputProps,
            style: {
              backgroundColor: 'white',
            },
          }}
          required 
        />
      )}
      
    />
  );
  

}