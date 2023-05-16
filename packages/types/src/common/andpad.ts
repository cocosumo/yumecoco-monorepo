import { z } from 'zod';

const joinedMembers = z.array(
  z.object({
    user_id: z.number().int(),
    common_id: z.string()
      .max(190)
      .nullable(),
    email: z.string().email(),
    name: z.string(),
    client: z.object({}),
    role: z.enum(['admin', 'basic']),
    job_names: z.array(z.string()),
  }),
);

export const addMembersResult201 = z.object({
  joined_members: joinedMembers,
});

export const addMembersResult207 = z.object({
  joined_members: joinedMembers,
  errors: z.array(
    z.object({
      message: z.string(),
      item: z.array(
        z.object({
          index: z.number().int(),
          key: z.string(),
          role: z.string().optional(),
          job_names: z.array(z.string().max(191)),
        }),
      ),
    }),
  ),
});

export type AddMembersResult201 = z.infer<typeof addMembersResult201>;
export type AddMembersResult207 = z.infer<typeof addMembersResult207>;