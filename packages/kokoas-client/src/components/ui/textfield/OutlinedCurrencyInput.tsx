import { InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material';
import { forwardRef } from 'react';

/**
 * コンマ区切りの数字を入力するためのコンポーネントです。
 * 
 * 挙動
 * 1. フォーカスが外れた時は、カンマを追加します。
 * 2. フォーカスがある時は、カンマを取り除きます。
 */
export const OutlinedCurrencyInput = forwardRef<HTMLInputElement, OutlinedInputProps>((props, ref) => {

  return (
    <OutlinedInput 
      {...props} 
      inputRef={ref}
      type='text' // numberだと、コンマを入れることが出来ない
      size='small' 
      endAdornment={(
        <InputAdornment position='end' disablePointerEvents>
          円
        </InputAdornment>
      )}
      inputProps={{ 
        style: { textAlign: 'right' }, 
      }}
      onFocus={({ target }) =>{
        target.value = target.value.replace(/,/g, '');
        target.select(); // ダブって原因でした。
      }}

      
    />
  );
});

OutlinedCurrencyInput.displayName = 'OutlinedCurrencyInput';