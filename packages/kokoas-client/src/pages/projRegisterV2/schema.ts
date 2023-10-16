import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { agentTypes, buildingTypes, realEstateStatus, recordCancelStatuses, recordStatuses } from 'types';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

const nonEmptyDropdown = z.string().nonempty({
  message: '選択してください。',
});



const agentSchema = z.object({
  key: z.string(),
  empId: z.string(),
  empRole: z.string(),
  empName: z.string(),
  empType: z.enum(agentTypes),
});


export const schema = z.object({
  projId: z.string().optional(),
  projTypeName: z.string(),

  projTypeId: nonEmptyDropdown,
  projName: z.string().nonempty(),
  otherProjType: z.string().optional(),

  projDataId: z.string(),
  createdDate: z.string(),

  custGroupId: z.string().nullable(),
  custName: z.string(),


  yumeAG: z.array(agentSchema),
  cocoAG: z.array(agentSchema),
  cocoConst: z.array(agentSchema),

  postal: z.string(),
  address1: z.string().nonempty(),
  address2: z.string().nonempty(),

  finalPostal: z.string(),
  finalAddress1: z.string(),
  finalAddress2: z.string(),

  isAddressKari: z.boolean(),
  isShowFinalAddress: z.boolean(),

  buildingType: z.enum(buildingTypes),

  status: z.enum(recordStatuses),
  hasContract: z.boolean(),
  hasCompletedContract: z.boolean(),

  cancelStatus: z.array(z.enum(recordCancelStatuses)).optional(),

  memo: z.string().optional(),

  deliveryDate: z.date().nullable(),
  projFinDate: z.date().nullable(),
  payFinDate: z.date().nullable(),

  logs: z.array(z.object({
    dateTime: z.date().optional(),
    log: z.string(),
    id: z.string(),
  })),

  /** 利益率 */
  profitRate: z.number()
    .min(0)
    .max(100),

  /** 紹介率 */
  commissionRate: z
    .number({ invalid_type_error: '数値を入力してください。' })
    .min(0)
    .max(100),

  /** 役職による紹介率 */
  commRateByRole: z.array(z.object({
    role: z.string(),
    rate: z.number(),
  })),

  /** 個別紹介率 */
  commRateByEmployee: z.array(z.object({
    commEmpName: z.string(),
    commEmpRole: z.string(),
    commEmpId: z.string(),
    commEmpRate: z.number(),
  })),


  // 見込み
  rank: z.string().optional(),
  schedContractPrice: z.number().optional(),
  realEstateStatus: z.enum(realEstateStatus),
  schedContractDate: z.date().nullable(),
  estatePurchaseDate: z.date().nullable(),
  planApplicationDate: z.date().nullable(),
  paymentMethod: z.string().optional(),

  // 店舗情報
  storeName: z.string(),
  storeId: z.string(),
  storeCode: z.string(),
  territory: z.string(),

})
  .superRefine((
    {

      isShowFinalAddress,
      finalAddress1,
      finalAddress2,
      
      projTypeName,
      otherProjType,

      hasContract,

      yumeAG,
    },
    ctx,
  ) => {
    if (isShowFinalAddress) {

      if (!finalAddress1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '住所を入力してください。',
          path: ['finalAddress1'],
        });
      }

      if (!finalAddress2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '住所を入力してください。',
          path: ['finalAddress2'],
        });
      }
    }

    if (projTypeName.includes('その他')) {
      if (!hasContract && !otherProjType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '工事種別を入力してください。',
          path: ['otherProjType'],
        });
      }
    } 

    const hasSelectedYumeAG = yumeAG.some((ag) => ag.empId !== '');
    if (!hasSelectedYumeAG) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'ゆめてつAGを入力してください。',
        path: ['yumeAG.0'],
      });
    }

  });

  


export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;
