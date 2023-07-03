import { useQuery } from '@tanstack/react-query';
import { getCompletedTickets } from 'api-kintone';
import { AppIds } from 'config';

/**　最新のシステム改修履歴を取得する */
export const useCompletedTickets = () => {
  return useQuery(
    [AppIds.ticketSystem],
    getCompletedTickets,
  );
};