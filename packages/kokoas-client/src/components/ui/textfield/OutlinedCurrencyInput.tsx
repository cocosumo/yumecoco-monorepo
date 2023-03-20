import { InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material';
import { convertToHalfWidth } from 'libs';
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
        target.select();
      }}
      onBlur={(e) => {
        props.onBlur?.(e);
        const rawValue = e.target.value;
        if (rawValue === '') return;
        
        const value = +convertToHalfWidth(rawValue);
        if (isNaN(value)) return;
        e.target.value = value.toLocaleString();
      }}
      
    />
  );
});

OutlinedCurrencyInput.displayName = 'OutlinedCurrencyInput';