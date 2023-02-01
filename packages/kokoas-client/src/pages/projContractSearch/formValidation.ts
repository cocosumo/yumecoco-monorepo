import { yupJA, yupValidations } from 'kokoas-client/src/helpers/yupLocaleJA';


const {
  yupNumberTransformNaN,
  yupDate,
} = yupValidations;



export const validationSchema = yupJA
  .object({
    mainSearch : yupJA.string(),
    contractDateFrom: yupDate
      .test(
        'contractDateFrom-less-than-contractDateTo',
        '契約日（から）は契約日（まで）より前である必要があります',
        function (value) {
          if (!value || !this.parent.contractDateTo) return true;
          return  value < this.parent.contractDateTo;
        },
      )
      .nullable(),
    contractDateTo: yupDate
      .test(
        'contractDateTo-less-than-contractDateFrom',
        '契約日（から）は契約日（まで）より前である必要があります',
        function (value) {
          if (!value || !this.parent.contractDateFrom) return true;
          return  value > this.parent.contractDateFrom;
        },
      )
      .nullable(),
    amountFrom : yupNumberTransformNaN
      .test('amount-from-less-than-amount-to',
        '最初の金額は後になるものより小さい必要があります',
        function (value) {
          if (!value || !this.parent.amountTo) return true;
          return value < this.parent.amountTo;
        }),
    amountTo : yupNumberTransformNaN
      .test(
        'amount-to-more-than-amount-from',
        '最初の金額は後になるものより小さい必要があります',
        function (value) {
          if (!value || !this.parent.amountFrom) return true;
          return value > this.parent.amountFrom;
        }),
  });