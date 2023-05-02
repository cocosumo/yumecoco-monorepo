import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { downloadContract } from '../api/docusign/downloadContract';

export const useContractFilesById = ({
  id,
}: {
  id?: string,
}) => {
  return useQuery(
    [AppIds.contracts, id, 'files'],
    () => downloadContract({ contractId: id ?? '' }),
    {
      enabled: !!id,
    },
  );
};