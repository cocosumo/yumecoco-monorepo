import { IProjtypes } from 'types';
import { TForm } from '../schema';

export const convertCommRateByRole = (
  list: IProjtypes['commRateByRoleList'] | undefined,
): TForm['commRateByRole'] => {
  if (!list) return [];

  return list.value
    .filter(({ value: { role } }) => !!role.value)
    .map(({
      value: { role, commRateByRole },
    }) => ({
      role: role.value,
      rate: Number(commRateByRole.value),
    }));
};