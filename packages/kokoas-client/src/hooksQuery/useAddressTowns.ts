import { useQuery } from '@tanstack/react-query';
import { getPostalCodes } from 'api-kintone';
import { AppIds } from 'config';

type GetTowns = Awaited<ReturnType<typeof getPostalCodes >>;

export const useAddressTowns = <T = unknown>(
  params: Parameters<typeof getPostalCodes>[0],
  options?: {
    select: (data: GetTowns) => T
  },
) => {
  const {
    city,
    prefecture,
  } = params;
  return useQuery(
    [AppIds.postalCode, params ],
    () =>getPostalCodes(params),
    {
      enabled: !!prefecture && !!city,
      ...options,
    },
  );
};