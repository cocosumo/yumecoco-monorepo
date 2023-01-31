import * as Yup from 'yup';
import * as ja from 'yup-locale-ja';

Yup.setLocale(ja.suggestive);

export const yupValidations = {
  yupNumber: Yup.number().typeError('数字を入力してください'),
  yupDate: Yup.date().typeError('日付を入力してください'),
};

export const yupJA = Yup;
