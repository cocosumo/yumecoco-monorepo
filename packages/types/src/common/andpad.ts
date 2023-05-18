import { z } from 'zod';

const errors = z.array(
  z.object({
    message: z.string(),
    item: z.object({
      index: z.number().int(),
      key: z.string(),
      role: z.string().optional(),
      job_names: z.array(z.string().max(191)).optional(),
    }),
      
  }),
);

const userSchema = z.object({
  user_id: z.number().int(),
  common_id: z.string().max(190)
    .nullable(),
  email: z.string().email(),
});

/**
 * 案件メンバー一覧取得
 */


/** 
 * 自社案件への案件メンバー一括登録 
 * */

const joinedMembers = z.array(
  userSchema.and(z.object({
    
    name: z.string(),
    client: z.object({}),
    role: z.enum(['admin', 'basic']),
    job_names: z.array(z.string()),
  })),
);

export const addMembersResult201 = z.object({
  joined_members: joinedMembers,
});

export const addMembersResult207 = addMembersResult201
  .and(z.object({
    errors: errors,
  }));

export type AddMembersResult201 = z.infer<typeof addMembersResult201>;
export type AddMembersResult207 = z.infer<typeof addMembersResult207>;

/** 
 * 自社案件の案件メンバー一括削除
 * */

const removedMembers = z.array(userSchema);

export const delMembersResult201 = z.object({
  removed_members: removedMembers,
});

export const delMembersResult207 = delMembersResult201
  .and(z.object({
    errors: errors,
  }));

export type DelMembersResult201 = z.infer<typeof delMembersResult201>;
export type DelMembersResult207 = z.infer<typeof delMembersResult207>;