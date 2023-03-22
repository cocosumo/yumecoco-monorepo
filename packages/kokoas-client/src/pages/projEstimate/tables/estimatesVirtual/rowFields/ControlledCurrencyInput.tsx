import { OutlinedCurrencyInput } from 'kokoas-client/src/components';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { getItemsFieldName, KRowFields, TypeOfForm } from '../../../form';
import { useEffect, useRef } from 'react';


/**
    全角を対応するために、当コンポーネントをuncontrolledにする。
    そうじゃないと、以下の不具合があります。
    
    全角の場合、

      Edge：コンマ後の入力がダブって入る。
      Chrome：全ての入力がダブって入る。

    半角の場合、
      Edge：問題なし
      Chrome：全ての入力がダブって入る。

    英数の場合、
      どのブラウザでも、問題なし。

    RFHのControllerのrefを渡してもプログラム的な設定では値が反映されないので、
    ここで別のinputRefを作成してregisterの動作を再現する。ただし、
    RFHのregisterでは反映されるが、defaultValueが反映されず、
    既存のデータの初期ロード時にカンマが入らない。

    *ブラウザ又はパッケージ更新で、変わるかもしれない。
    
    onCompositionStart, onCompositionEndを使って方法もあるらしいが、
    ブラウザによっては、挙動が変わります。

    この記事は古いが、同じ辛さ経験しました。
    https://qiita.com/is_yanyan/items/d14ecb3d2e5b7d119d5d
    
    日本の独特な仕様もあるので、 方法は気づいていないだけかもしれません。
    以下の解決策によりいい方法があれば教えてください。

   */

export const ControlledCurrencyInput = ({
  rowIdx,
  handleChange,
  fieldName,
}: {
  rowIdx: number
  handleChange: () => void,
  fieldName: KRowFields

}) => {

  const { control } = useFormContext<TypeOfForm>();

  const name = getItemsFieldName(rowIdx, fieldName);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [
    envStatus,
    fieldValue,
  ] = useWatch({
    name: [
      'envStatus',
      name,
    ],
    control,
  });

  useEffect(() => {
    if (inputRef.current) {
      // 表示を更新する
      // 例：実値は1000だが、表示は1,000になる。
      inputRef.current.value = fieldValue.toLocaleString();
    }
  }, [
    fieldValue,
    name,
    rowIdx,
  ]);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {
          onBlur,
          onChange,
          ref,
          value,
        },
        fieldState: {
          error,
          isTouched,
        },
      }) => {

        return (
          <OutlinedCurrencyInput
            inputRef={(el) => {
              /** RFHと共有 */ 
              ref(el);
              inputRef.current = el;
            }}
            defaultValue={value.toLocaleString()}
            name={name}
            onBlur={onBlur}
            onChange={(e) => {
              const rawValue = e.target.value;
              //const normalizedValue = convertToHalfWidth(rawValue);
              //const newValue = normalizedValue.replace(/,/g, '');
 
              //console.log('costPriceOnChange', newValue, e.target.value);
              onChange(rawValue);
              handleChange();
            }}
            error={!!error && isTouched}
            disabled={!!envStatus}
          />
        );
      }}
    />


  );
};