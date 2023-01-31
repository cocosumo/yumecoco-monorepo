import { yupJA, yupValidations } from 'kokoas-client/src/helpers/yupLocaleJA';


const {
  yupNumber,
} = yupValidations;
/*   mainSearch: '',
  contractDateFrom: null as null | string,
  contractDateTo: null as null | string,
  amountFrom: 0,
  amountTo: 0, */

/* MAIN VALIDATION SCHEMA */

export const validationSchema = yupJA
  .object({
    contractDateFrom: yupJA.date().nullable(),
    contractDateTo: yupJA.date().nullable(),
    mainSearch : yupJA.string(),
    amountTo :  yupNumber,
    amountFrom : yupNumber.lessThan(yupJA.ref('amountTo'), '最初の金額は後になるものより小さい必要があります。'),
  });