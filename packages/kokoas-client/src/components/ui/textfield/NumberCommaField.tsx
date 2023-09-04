import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { UseNumberCommaFieldProps, useNumberCommaField } from 'kokoas-client/src/hooks/useNumberCommaField';
import { ReactNode, forwardRef } from 'react';




export type NumberCommaFieldProps = Omit<TextFieldProps, 'onChange' | 'onBlur' | 'type'> 
& UseNumberCommaFieldProps 
& {
  startAdornment?: ReactNode,
};


/**
 * TextFieldから派生したコンポーネントですが、
 * コンマ区切りの数字を入力することが出来ます。
 * 
 * MUIではないInputなら、直接useNumberCommaFieldを使えます。
 * 
 * ざっくり実装です。estimateのinputのE2Eテスト合格していますが、
 * 固定の部分があるので、必要に応じて改修　~ Ras
 */
export const NumberCommaField = forwardRef<HTMLInputElement, NumberCommaFieldProps>((props, ref) => {

  const {
    value,
    onChange,
    onBlur,
    inputProps,
    startAdornment,
    ...others
  } = props;

  const textProps = useNumberCommaField({
    onChange,
    onBlur,
    value,
  });

  return (
    <TextField
      ref={ref}
      type='text' // numberだと、コンマを入れることが出来ない
      inputProps={{
        style: {
          ...inputProps?.style,
          textAlign: 'right',
        },
      }}
      InputProps={{
        startAdornment: startAdornment ?? undefined,
        endAdornment: (
          <InputAdornment position='end' disablePointerEvents>
            円
          </InputAdornment>
        ),
      }}
      {...others}
      {...textProps}
    />
  );
});

NumberCommaField.displayName = 'NumberCommaField';


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
  そして、Googleのトップに出てくる日本語での記事もほとんど不正確
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
