import { useQuery } from '@tanstack/react-query';
import { getAreas } from '../api/others/address';

/** 地方を取得する */
export const useAddressAreas = () => {
  return useQuery(
    ['addressAreas'],
    getAreas,
  );
};