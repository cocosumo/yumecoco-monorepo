import { yupJA, yupValidations } from 'kokoas-client/src/helpers/yupLocaleJA';


const {
  yupNumber,
  yupDate,
} = yupValidations;


export const validationSchema = yupJA
  .object({
    mainSearch : yupJA.string(),
    contractDateFrom: yupDate
      .when('contractDateTo', {
        is: Boolean,
        then: yupDate.max(yupJA.ref('contractDateTo'), '契約日（から）は契約日（まで）より前である必要があります'),
      })
      .nullable(),
    contractDateTo: yupDate.nullable(),
    amountFrom : yupNumber.when('amountTo', {
      is: (value: number) => value !== undefined,
      then: yupNumber.lessThan(yupJA.ref('amountTo'), '最初の金額は後になるものより小さい必要があります'),
    }),
    amountTo : yupNumber,
  });