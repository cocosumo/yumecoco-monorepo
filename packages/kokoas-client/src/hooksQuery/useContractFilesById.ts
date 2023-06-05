import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { downloadContract } from '../api/docusign/downloadContract';

export const useContractFilesById = ({
  id,
  enabled = true,
}: {
  id?: string,
  enabled?: boolean,
}) => {
  return useQuery(
    [AppIds.contracts, id, 'files'],
    () => downloadContract({ contractId: id ?? '' }),
    {
      enabled: !!id && enabled,
    },
  );
};