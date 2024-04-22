import { TextFieldProps } from '@mui/material';
import { convertToHalfWidth } from 'libs';
import { ChangeEventHandler, useEffect, useRef } from 'react';

export interface UseNumberCommaFieldProps {
  value?: number | string
  onChange?: (value: number | string) => void,
  onBlur?: ChangeEventHandler,
  shouldSelectOnFocus?: boolean,
}

export const useNumberCommaField = ({
  value,
  onChange,
  onBlur,
  shouldSelectOnFocus = true,
} : UseNumberCommaFieldProps) : TextFieldProps => {
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldChange = useRef(true); 

  useEffect(() => {
    if (!inputRef.current) return;

    const focusedInputElement = document.activeElement;

    const isSameInputElFocused = focusedInputElement instanceof HTMLInputElement 
      && focusedInputElement === inputRef.current;
      
    if (isSameInputElFocused) {
      // 入力中の場合、コンマを追加しない。
      inputRef.current.value = String(value);
    } else {
      // 表示を更新する
      // 例：実値は1000だが、表示は1,000になる。
      inputRef.current.value = (Number(value)).toLocaleString();

    } 

  }, [ value ]);

  return {
    onFocus: (_e) => {
      _e.target.value = _e.target.value.replace(/,/g, '');
      if (shouldSelectOnFocus) {
        _e.target.select(); // ダブって原因でした。
      }
    },
    onCompositionStart : () => {
      //const el = e.target as HTMLInputElement;   
      shouldChange.current = false;
      //console.log('COMPOSITION_START', e.nativeEvent, el.value);
    },
    onCompositionEnd: (e) => {
      // ここでは二重にならない
      const el = e.target as HTMLInputElement;
      const halfWidth = convertToHalfWidth(el.value);
      // console.log('COMPOSITION_END', e.nativeEvent, el.value, halfWidth);
      const halfWidthNumber = +halfWidth;
      if (isNaN(halfWidthNumber)) {
        onChange?.(el.value);
      } else {
        onChange?.(halfWidthNumber);
      }
    },
    onInput: (e) => {

      const { 
        value: inputValue, 
      } = e.target as HTMLInputElement;
   
      if (shouldChange.current) {
        onChange?.(inputValue);
      }
    
    },
    onBlur: (e) => {
      shouldChange.current = true;
      const el = e.target as HTMLInputElement;
      if (el.value === '') return e;
      const halfWidth = convertToHalfWidth(el.value);
      const halfWidthNumber = +halfWidth;
      if (isNaN(halfWidthNumber)) return;
      onChange?.(halfWidthNumber);  
      //console.log('BLUR', e.nativeEvent, newValue, el.value);
      el.value = halfWidthNumber.toLocaleString();
   
      onBlur?.(e);
    },
    inputRef,
  };
};