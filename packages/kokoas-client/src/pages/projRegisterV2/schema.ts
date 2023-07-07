import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { buildingTypes, recordCancelStatuses, recordStatuses, territories } from 'types';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

export const schema = z.object({
  projId: z.string().optional(),
  projTypeName: z.string(),
  projTypeId: z.string().nonempty({
    message: '工事種別を選択してください。',
  }),
  projName: z.string(),
  projDataId: z.string(),
  createdDate: z.string(),
  storeCode: z.string(),

  custGroupId: z.string().nullable(),
  custName: z.string(),
  storeId: z.string(),
  territory: z.enum(territories).nullable(),

  cocoConst1: z.string(),
  cocoConst2: z.string(),

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

  logs: z.array(z.object({
    dateTime: z.date().optional(),
    log: z.string(),
    id: z.string(),
  })),

})
  .superRefine((
    {
      isShowFinalAddress,
      finalAddress1,
      finalAddress2,
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
  });

  


export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;
