import { zodErrorMapJA } from 'kokoas-client/src/lib/zodErrorMapJA';
import { territories } from 'types';
import { z } from 'zod';

z.setErrorMap(zodErrorMapJA());

export const subsidyMethods = ['工事に含む', '顧客に返金'] as const;
export type SubsidyMethod = typeof subsidyMethods[number];

export const payMethods = ['持参', '集金', '振込'] as const;

const schema = z.object({

  /** 顧客名 */
  custName : z.string().nullable(),

  /** 発注者住所・工事場所住所 */
  address : z.string().nullable(),

  /** 店舗 */
  stores : z.array(z.string()).nullable(),

  /** 領域 */
  territories : z.array(z.enum(territories)).nullable(),
  
  /** ここすもAG */
  cocoAG : z.array(z.string()).nullable(),

  /** ゆめてつAG */
  yumeAG : z.array(z.string()).nullable(),

  /** キーワード */
  keyword : z.string().nullable(),
  
  /** 契約日　From */
  contractDateFrom : z.date().nullable(),

  /** 契約日　To */
  contractDateTo : z.date().nullable(),

  /** 完工日　From */
  completionDateFrom : z.date().nullable(),

  /** 完工日　To */
  completionDateTo : z.date().nullable(),
});
  


export type TypeOfForm = z.infer<typeof schema>;
export type KeyOfForm = keyof TypeOfForm;


export default schema;