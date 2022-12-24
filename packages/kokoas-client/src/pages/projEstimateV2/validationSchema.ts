import { yupJA, yupValidations } from 'kokoas-client/src/helpers/yupLocaleJA';

const {
  yupNumber,
} = yupValidations;

export const validationSchema = yupJA
  .object({
    custGroupId: yupJA.string(),
    customerName :  yupJA.string(),
    projDataId: yupJA.string().required(),
    projId: yupJA.string().required(),
    projName: yupJA.string().required(),
    projTypeId: yupJA.string().required(),
    projTypeName : yupJA.string().required(),
    
    profitRate: yupNumber.max(100).required(),


  });