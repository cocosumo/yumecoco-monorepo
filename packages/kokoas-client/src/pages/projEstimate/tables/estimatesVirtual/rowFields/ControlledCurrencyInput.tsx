import { OutlinedCurrencyInput } from 'kokoas-client/src/components';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { getItemsFieldName, KRowFields, TypeOfForm } from '../../../form';
import { useEffect, useRef } from 'react';
import { convertToHalfWidth } from 'libs';


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

  RHFのControllerのrefを渡してもプログラム的な設定では値が反映されないので、
  ここで別のinputRefを作成してregisterの動作を再現する。ただし、
  RHFのregisterでは反映されるが、defaultValueが反映されず、
  既存のデータの初期ロード時にカンマが入らない。

  *ブラウザ又はパッケージ更新で、変わるかもしれない。

  ------------------

  この記事は古いが、同じ辛さ経験しました。
  https://qiita.com/is_yanyan/items/d14ecb3d2e5b7d119d5d


  一番細かく説明しているのは以下の記事ですが、3年前のものなので、
  不正確な部分があると分かります。
  https://qiita.com/darai0512/items/fac4f166c23bf2075deb

  W3c参考しますが、ドラフトなので、ブラウザーによっての実装はさまざま。
  https://www.w3.org/TR/input-events-2/

  W3cでイベント順番は議論中
  https://github.com/w3c/uievents/issues/202

  イベントの発火順番も、ブラウザーによって異なる。
  そして、Google先生のトップに出てくる日本語での記事もほとんど不正確
  自分で調査したところ、Chromeは以下の順番でイベントが発火する。
    - compositionstart
    - input, isComposing = true
    - change, isComposing = true
    - compositionend, ここでRHFにて値を更新する
    - beforeinput, isComposing指定なし、他ブラウザーではcompositionendが先に発火する
    - input, isComposing = false, この段階から、*条件を揃えば、2重になる
    - change, isComposing = false

  *条件：componsitionstartの前にselect()を発火し、マウスでIMEを確定
  
  その条件はFacebookの検索バーで試して、同じバグが発生します。
  他サイトでも、強制的にselect()を組み込むと、同じバグが発生します。

  議論中の標準もあり、挙動は変わるかもしれないので、それぞれケースにE2Eテストを書いておきます。
  ~ ras 2023.03.24
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

  /* 
    IME入力開始するとfalse, blurの際にtrueに戻す。
    以上のバグの条件を参考
  */
  const shouldChange = useRef(true); 
  

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
    if (!inputRef.current) return;
    
    const focusedInputElement = document.activeElement;

    const isSameInputElFocused = focusedInputElement instanceof HTMLInputElement 
      && focusedInputElement === inputRef.current;
      
    if (isSameInputElFocused) {
      // 入力中の場合、コンマを追加しない。
      inputRef.current.value = String(fieldValue);
    } else {
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
            ref={(el) => {
              /** RHFと共有 */ 
              inputRef.current = el;
              ref(el);              
            }}
            defaultValue={value.toLocaleString()}
            name={name}
            onCompositionStart={() => {
              //const el = e.target as HTMLInputElement;   
              shouldChange.current = false;
              //console.log('COMPOSITION_START', e.nativeEvent, el.value);
            }}
            onCompositionEnd={(e) => {
              // ここでは二重にならない
              const el = e.target as HTMLInputElement;
              console.log('COMPOSITION_END', e.nativeEvent, el.value);
              onChange(+convertToHalfWidth(el.value));
            }}
            onBeforeInput={() => {
              // Chromeではcompositionendが先に発火するので、使えない
              //const el = e.target as HTMLInputElement;
              //const inputEvent = e.nativeEvent as InputEvent;
              //console.log('BEFORE_INPUT', inputEvent, el.value);
            }}
            onInput={(e) => {
              // ここではブラウザのバグの条件*が揃ったら、二重になる
              //const {
              //  inputType,
              //} = e.nativeEvent as InputEvent;
              const { 
                value: inputValue, 
              } = e.target as HTMLInputElement;

              //console.log('INPUT', e.nativeEvent, inputValue, inputType);

              if (shouldChange.current) {
                onChange(inputValue);
                handleChange();
              }
              
            }}
            onChange={() => {
              // IME入力中に値を弄ると、二重になるので使わない
              //console.log('CHANGE', e.nativeEvent, e.target.value);
            }}
            onBlur={(e) => {
              shouldChange.current = true;
              onBlur();
              const el = e.target as HTMLInputElement;
              if (el.value === '') return e;

              const newValue = +fieldValue;
              if (isNaN(newValue)) return e;
              //console.log('BLUR', e.nativeEvent, newValue, el.value);
              el.value = newValue.toLocaleString();
            }}
            error={!!error && isTouched}
            disabled={!!envStatus}
          />
        );
      }}
    />


  );
};


/* isTrusted
: 
false
bubbles
: 
true
cancelBubble
: 
false
cancelable
: 
true
composed
: 
true
currentTarget
: 
null
data
: 
"１"
defaultPrevented
: 
false
detail
: 
0
eventPhase
: 
0
returnValue
: 
true
sourceCapabilities
: 
InputDeviceCapabilities {firesTouchEvents: false}
srcElement
: 
input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.css-yfc78v-MuiInputBase-input-MuiOutlinedInput-input
target
: 
input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd.css-yfc78v-MuiInputBase-input-MuiOutlinedInput-input
timeStamp
: 
351307.10000002384
type
: 
"compositionend"
view
: 
Window {window: Window, self: Window, document: document, name: '', location: Location, …}
which
: 
0 */