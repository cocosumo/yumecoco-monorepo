import { useQuery } from '@tanstack/react-query';
import { getAddressByPostal } from '../api/others/getAddressByPostal';

export const useAddressPostalCode = (
  postalCode: string | '',
  options?: {
    enabled: boolean,
  },
) => {
  return useQuery(
    ['addressPostalCode', { postalCode }],
    () => getAddressByPostal(postalCode),
    { ...options },
  );
};