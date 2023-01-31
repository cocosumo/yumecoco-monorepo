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

const amountErrorMessage = '最初の金額は後になるものより小さい必要があります';
const yupDateNullable = yupJA.date().nullable();

export const validationSchema = yupJA
  .object({
    mainSearch : yupJA.string(),
    contractDateFrom: yupJA
      .date()
      .when('contractDateTo', {
        is: Boolean,
        then: yupJA.date().max(yupJA.ref('contractDateTo'), '契約日（から）は契約日（まで）より前である必要があります'),
      })
      .nullable(),
    contractDateTo: yupDateNullable,
    amountFrom : yupNumber.when('amountTo', {
      is: (value: number) => value !== undefined,
      then: yupNumber.lessThan(yupJA.ref('amountTo'), amountErrorMessage),
    }),
    amountTo : yupNumber,
  });