import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { addressHasPrefecture } from 'libs';
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
  inHouseProjTypeId: z.string().optional(),
  inHouseProjTypeName: z.string().optional(),

  projDataId: z.string(),
  createdDate: z.string(),

  custGroupId: z.string().nullable(),
  custName: z.string(),


  yumeAG: z.array(agentSchema),
  cocoAG: z.array(agentSchema),
  cocoConst: z.array(agentSchema),

  isNotCocoConstConfirmed: z.boolean(), // 未定かどうか

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
      address1,

      isShowFinalAddress,
      finalAddress1,
      finalAddress2,

      deliveryDate,
      projFinDate,
      
      projTypeName,
      otherProjType,
      inHouseProjTypeName,

      hasContract,

      yumeAG,

      isNotCocoConstConfirmed,
      cocoConst,
    },
    ctx,
  ) => {
    if (!hasContract && !addressHasPrefecture(address1)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Andpadで必須のため、都道府県を入力してください。',
        path: ['address1'],
      });
    }

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

    if (projTypeName.includes('自社物件')) {
      if (!hasContract && !inHouseProjTypeName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '自社工事区分を入力してください。',
          path: ['inHouseProjTypeName'],
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

    // K240 工事担当者を必須。決まってない場合にも工事登録できるように、「未定」というチェックができるようにしてほしい
    const hasSelectedCocoConst = cocoConst.some((ag) => ag.empId !== '');
    if (!isNotCocoConstConfirmed && !hasSelectedCocoConst) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '工事担当者を入力してください。決まっていない場合、「未定」にチェックを入れてください。',
        path: ['cocoConst.0'],
      });
    }

    // K217 物件完了日を入力したら、保存するとき、引き渡し日は必須項目になる
    if (projFinDate && !deliveryDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '物件完了日を入力したら、引き渡し日が必須項目になります。',
        path: ['deliveryDate'],
      });
    }


  });

  


export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;
