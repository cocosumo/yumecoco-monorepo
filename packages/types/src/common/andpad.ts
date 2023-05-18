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

const extendedUserSchema = userSchema
  .and(z.object({
    name: z.string().optional(),
    role: z.enum(['admin', 'basic']),
    job_names: z.array(z.string()),
  }));

const extendedUserSchemaWithClient = extendedUserSchema
  .and(z.object({
    client: z.object({
      id: z.number().int()
        .nullable(),
      name: z.string().nullable(),
    }),
  }));

/**
 * 案件メンバー一覧取得
 */

export const getMembersResult = z.object({
  pagination: z.object({
    //integer >= 1
    page: z.number().int(),
    per_page: z.number().int(),
    last_page: z.number().int(),
    total: z.number().int(),
  }),
  data: z.array(extendedUserSchemaWithClient),
});

export type GetMembersResult = z.infer<typeof getMembersResult>;


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


/** 
 * 自社案件の案件メンバー情報一括更新 
 * */

const updatedMembers = z.array(extendedUserSchema);

export const updateMembersResult200 = z.object({
  updated_members: updatedMembers,
});

export const updateMembersResult207 = updateMembersResult200
  .and(z.object({
    errors: errors,
  }));

export type UpdateMembersResult200 = z.infer<typeof updateMembersResult200>;
export type UpdateMembersResult207 = z.infer<typeof updateMembersResult207>;