import * as Yup from 'yup';
import * as ja from 'yup-locale-ja';

Yup.setLocale(ja.suggestive);

const yupNumber = Yup.number().typeError('数字を入力してください');

export const yupValidations = {
  /** 数字だけ */
  yupNumber,

  /**
   * 数字とNaNを許す
   * inputは通常stringしか、返っていませんが、react-hook-formは
   * フィールドのtypeをnumberに設定すると、numberに変換してくれます。
   *
   * ただ、空のstringの場合、NaNになります。
   * https://react-hook-form.com/api/useform/register/
   *
   * バリデーションの際、NaNだと、空のstringに変換するようにします。
   * undefined
   * */
  yupNumberTransformNaN: yupNumber.transform((value) => {
    return (isNaN(value) ? undefined : value);
  }),

  /** 日付 */
  yupDate: Yup.date().typeError('日付を入力してください'),
};

export const yupJA = Yup;
