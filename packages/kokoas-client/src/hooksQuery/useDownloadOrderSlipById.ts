import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { downloadOrderSlipById } from '../api/others/downloadOrderSlipById';

export const useDownloadOrderSlipById = (orderId: string) => {


  return useQuery({
    queryKey: [AppIds.order, orderId, 'downloadOrderSlip'],
    queryFn: () => downloadOrderSlipById(orderId),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
  