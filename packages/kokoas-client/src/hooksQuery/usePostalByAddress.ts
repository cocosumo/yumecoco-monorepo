import { useQuery } from '@tanstack/react-query';
import { getPostalByAddress } from '../api';

export const usePostalByAddress = (address: string) => {
  return useQuery(
    ['postalByAddresss', address],
    () => getPostalByAddress(address),
    { 
      enabled: !!address,
    },
  );
};