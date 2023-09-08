import { getUsers } from './getUsers';

/* Wrapper functions */

/**
 * Warning: Administrator account code may not be supported ~ ras
 *
 */

export const getUserByCode = async (code: string) =>
  (await getUsers({ codes: code }))[0];

export const getUserById = async (id: string | number) =>
  (await getUsers({ ids: +id }))[0];
