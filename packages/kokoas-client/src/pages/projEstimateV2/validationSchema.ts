import { yupJA, yupValidations } from 'kokoas-client/src/helpers/yupLocaleJA';

const {
  yupNumber,
} = yupValidations;

export type TStatusChoices = '' | '契約' | '銀行用' | '工事実行' | '追加' | '追加減額';

export const statusChoices: TStatusChoices[] = [ '', '契約', '銀行用', '工事実行', '追加', '追加減額'];


export const validationSchema = yupJA
  .object({
    createdDate: yupJA.date().nullable(),
    custGroupId: yupJA.string(),
    customerName :  yupJA.string(),

    estimateId: yupJA.string().required(),
    estimateDataId: yupJA.string(),

    projDataId: yupJA.string().required(),
    projId: yupJA.string().required(),
    projName: yupJA.string().required(),
    
    projTypeId: yupJA.string().required(),
    projTypeName : yupJA.string().required(),
    projTypeProfitLatest: yupNumber.max(100),
    projTypeProfit: yupNumber.max(100),

    taxRate: yupNumber.required(),
    status: yupJA.mixed<TStatusChoices>().oneOf(statusChoices),

    envStatus: yupJA.string(),

  });