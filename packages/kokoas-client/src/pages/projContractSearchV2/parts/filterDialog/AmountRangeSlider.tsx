import { Slider } from '@mui/material';
import isArray from 'lodash/isArray';
import { useCallback } from 'react';
import { useTypedFormContext, useTypedWatch } from '../../hooks/useTypedHooks';


export const AmountRangeSlider = ({
  min = -20000,
  max = 50000000,
}: {
  min?: number,
  max?: number,
}) => {

  const {
    control,
    setValue,
    clearErrors,
  } = useTypedFormContext();

  const [
    amountFrom, 
    amountTo] = useTypedWatch({
    name: [
      'amountFrom',
      'amountTo',
    ],
    control,
  }) as number[];

  /**
   * スライダーの値を判定する
   * @param originalVal　実値
   * @param fallbackVal　フォールバック値
   *
   * 実値はundefined又は空のstringの場合、スライダーの最小・最大値を返す。
   */
  const normalizeSliderValue = useCallback((
    originalVal: number | string | undefined, fallbackVal: number,
  ) => {
    return  originalVal === undefined || (typeof originalVal === 'string' && originalVal === '') ? fallbackVal : +originalVal;
  }, []);

  return (
    <Slider
      value={[
        normalizeSliderValue(amountFrom, min),
        normalizeSliderValue(amountTo, max),
      ]}
      onChange={(_: Event, newVal) => {
        if (isArray(newVal)) {
          const [newAmountFrom, newAmountTo] = newVal;

          setValue('amountFrom', newAmountFrom);
          setValue('amountTo', newAmountTo);

          // 決してエラーにならないと想定して、エラーを強制的に解消（多分）。
          // setValueのshouldValidateも使えますが、実際にバリデーションを行うと、スライダーのラグが発生する。
          // 想定が間違っていたら、改修。
          clearErrors('amountFrom');
          clearErrors('amountTo');
        }

      }}
      valueLabelFormat={(val) => `${val.toLocaleString()} 円`}
      valueLabelDisplay="auto"
      min={min}
      max={max}
    />
  );
};