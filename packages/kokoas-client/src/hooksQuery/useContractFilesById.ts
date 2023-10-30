import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { downloadContract } from '../api/docusign/downloadContract';

export const useContractFilesById = ({
  id,
  revision,
  enabled = true,
}: {
  id?: string,
  revision: string, // trigger refetch when revision changes
  enabled?: boolean,
}) => {

  return useQuery(
    [
      AppIds.contracts, 
      'files',
      id, 
      revision,
    ],
    () => {
      return downloadContract({ contractId: id ?? '' });
    },
    {
      refetchOnMount: true,
      enabled: !!id && enabled,
    },
  );
};