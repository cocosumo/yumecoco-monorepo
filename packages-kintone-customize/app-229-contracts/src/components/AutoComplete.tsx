import { Autocomplete, TextField } from '@mui/material';
import { setFieldValue } from 'api-kintone';
import { useState } from 'react';

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
  const [value, setValue] = useState<AutoCompleteOption | null>(initialValue ?? null);
  const [options, setOptions] = useState<AutoCompleteOption[]>([]);
  
  const handleOpen = async () => {
    console.log('handleOpen');
    const newOptions = await fetchOptions();
    setOptions(newOptions);
  };

  return (
    <Autocomplete
      disablePortal
      value={value}
      onOpen={handleOpen}
      options={options}
      onChange={(_, newValue) => {

        setValue(newValue);
        setFieldValue(fieldId, newValue?.id ?? '');
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} required />}
      
    />
  );
  

}