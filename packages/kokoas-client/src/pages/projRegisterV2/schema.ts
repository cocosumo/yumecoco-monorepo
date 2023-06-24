import { saveProjectData } from 'api-andpad';
import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { buildingTypes, recordCancelStatuses, recordStatuses, territories } from 'types';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

export const schema = z.object({
  projId: z.string().optional(),
  projTypeName: z.string(),
  projTypeId: z.string(),
  projName: z.string(),
  projDataId: z.string(),
  createdDate: z.string(),
  storeCode: z.string(),

  custGroupId: z.string().nullable(),
  custName: z.string(),
  storeId: z.string(),
  territory: z.enum(territories).nullable(),

  isAgentConfirmed: z.boolean(),
  cocoConst1: z.string(),
  cocoConst2: z.string(),
  postal: z.string(),
  address1: z.string(),
  address2: z.string(),
  addressKari: z.string(),
  buildingType: z.enum(buildingTypes),

  isAddressKari: z.boolean(),
  status: z.enum(recordStatuses),
  hasContract: z.boolean(),
  hasCompletedContract: z.boolean(),

  cancelStatus: z.array(z.enum(recordCancelStatuses)),

  andpadDetails: saveProjectData.optional(),

  remarks: z.array(z.object({
    id: z.string(),
    noteCreateTime: z.date(),
    noteUpdateTime: z.date(),
    remark: z.string(),
  })),

  logs: z.array(z.object({
    dateTime: z.date().optional(),
    log: z.string(),
    id: z.string(),
  })),

});


export type TForm = z.infer<typeof schema>;
export type KForm = keyof TForm;
