import { getCities } from 'kokoas-client/src/api/others/address';
import { useQuery } from '@tanstack/react-query';

type GetCities = Awaited<ReturnType<typeof getCities >>;

export const useAddressCities = <T = GetCities>(
  prefecture = '', 
  options?: {
    select: (data: GetCities) => T
  },
) => {
  return useQuery(
    ['addressCities', { prefecture }],
    () => getCities({ prefecture }),
    { 
      enabled: !!prefecture, 
      ...options,
    },
  );
};