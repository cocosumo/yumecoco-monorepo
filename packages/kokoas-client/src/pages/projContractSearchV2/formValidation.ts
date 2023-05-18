import { TableSortLabelProps } from '@mui/material';
import { yupJA, yupValidations } from 'kokoas-client/src/helpers/yupLocaleJA';
import { ContractRow } from './hooks/useFilteredContracts';

const {
  yupNumberTransformNaN,
  yupDate,
} = yupValidations;

const dateRangeErrorMsg = '契約日（から）は契約日（まで）より前である必要があります';
const amountRangeErrorMsg =  '最小金額は最大金額より小さい必要があります';

export const validationSchema = yupJA
  .object({
    orderBy: yupJA.mixed<keyof ContractRow>(),
    order: yupJA.mixed<TableSortLabelProps['direction']>().oneOf(['asc', 'desc']),
    mainSearch : yupJA.string(),
    contractDateFrom: yupDate
      .test(
        'contractDateFrom-less-than-contractDateTo',
        dateRangeErrorMsg,
        function (value) {
          if (!value || !this.parent.contractDateTo) return true;
          return  value <= this.parent.contractDateTo;
        },
      )
      .nullable(),
    contractDateTo: yupDate
      .test(
        'contractDateTo-less-than-contractDateFrom',
        dateRangeErrorMsg,
        function (value) {
          if (!value || !this.parent.contractDateFrom) return true;
          return  value >= this.parent.contractDateFrom;
        },
      )
      .nullable(),
    amountFrom : yupNumberTransformNaN
      .test('amount-from-less-than-amount-to',
        amountRangeErrorMsg,
        function (value) {
          if (!value || !this.parent.amountTo) return true;
          return value < this.parent.amountTo;
        })
      .optional(),
    amountTo : yupNumberTransformNaN
      .test(
        'amount-to-more-than-amount-from',
        amountRangeErrorMsg,
        function (value) {
          if (!value || !this.parent.amountFrom) return true;
          return value > this.parent.amountFrom;
        },
      )
      .optional(),
    contractCompleted: yupJA.boolean().required(),
    contractIncomplete: yupJA.boolean().required(),
    contractStepTencho: yupJA.boolean().required(),
    contractStepCustomer: yupJA.boolean().required(),
    contractStepAG: yupJA.boolean().required(),
    contractStepAccounting: yupJA.boolean().required(),
    contractStepMain: yupJA.boolean().required(),
    storeNamesShort: yupJA.array(yupJA.string().required()).nullable(),
  });