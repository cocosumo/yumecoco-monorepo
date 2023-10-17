import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { territories } from 'types';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

const dateType = z.union([z.string(), z.date()]).nullable();


const schema = z.object({

  /** 顧客名 */
  custName : z.string().nullable(),

  /** 削除含む */
  includeDeleted : z.boolean(),

  /** 発注者住所・工事場所住所 */
  address : z.string().nullable(),

  /** 店舗 */
  stores : z.array(z.string()).nullable(),

  /** 工事種別 */
  projTypes : z.array(z.string()).nullable(),

  /** 領域 */
  territories : z.array(z.enum(territories)).nullable(),

  /** 退職者 */
  includeRetired : z.boolean(),
  
  
  /** ここすもAG */
  cocoAG : z.array(z.string()).nullable(),

  /** ゆめてつAG */
  yumeAG : z.array(z.string()).nullable(),

  /** キーワード */
  keyword : z.string().nullable(),
  
  /** 契約日　From */
  contractDateFrom : dateType,

  /** 契約日　To */
  contractDateTo : dateType,

  /** 引き渡し日　From */
  deliveryDateFrom : dateType,

  /** 引き渡し日　To */
  deliveryDateTo : dateType,

  /** 支払い完了日 From */
  paidDateFrom : dateType,

  /** 支払い完了日 To */
  paidDateTo : dateType,

  /** 完工日　From */
  completionDateFrom : dateType,

  /** 完工日　To */
  completionDateTo : dateType,
  
  /** 最終請求日 From*/
  lastBillDateFrom : dateType,

  /** 最終請求日 To */
  lastBillDateTo : dateType,


  order: z.enum(['asc', 'desc']),

  orderBy: z.string().nullable(),

});
  


export type TypeOfForm = z.infer<typeof schema>;
export type KeyOfForm = keyof TypeOfForm;


export default schema;