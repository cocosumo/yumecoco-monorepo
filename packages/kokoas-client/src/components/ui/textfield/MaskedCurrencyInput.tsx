import { InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

// react-text-mask 参考：https://github.com/text-mask/text-mask/tree/master/addons/#readme

/**
 * 入力中、数字をコンマ―で区切ってくれます。
 *
 * react-text-maskはもう保守されていないパッケージのようですが、要件を満たしています。
 * もし、よりいいパッケージを見つかったら、当コンポーネントの廃棄・改善お願いします。 ~ ras 2022.02.07
 *
 * 当コンポーネントはMUIのOutlinedInputから派生していて、OutlinedInputと同じようにpropsを指定出来ます。
 *
 * 参考：https://github.com/text-mask/text-mask/tree/master/addons/#readme
 */
export const MaskedCurrencyInput = ({
  onChange,
  onBlur,
  value,
  ...otherProps
}: Omit<OutlinedInputProps, 'inputRef'> & {
  onChange: (event: string | number) => void
}) => {

  const numberMask = createNumberMask({
    prefix: '',
    allowNegative: true,
  });

  return (
    <MaskedInput
      value={value as number}
      mask={numberMask}
      render={(maskRef, renderProps) => (
        <OutlinedInput
          inputRef={maskRef}
          onChange={(e) => {
            renderProps.onChange(e);
            const input = e.target.value.replaceAll(',', '');
            onChange(input);

          }}
          onBlur={(e) => {
            onBlur?.(e);
            renderProps.onBlur(e);
          }}
          size={'small'}
          endAdornment={(
            <InputAdornment position='end' disablePointerEvents>
              円
            </InputAdornment>
          )}
          inputProps={{
            style: { textAlign: 'right' },
          }}
          onFocus={({ target }) => target.select()}
          {...otherProps}
        />)}
    />
  );
};