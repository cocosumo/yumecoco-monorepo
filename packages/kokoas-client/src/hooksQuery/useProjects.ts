import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from 'api-kintone';
import { AppIds } from 'config';

type DefaultResult = Awaited<ReturnType<typeof getAllProjects>>;

/**
 * 工事を全て取得する
 */
export const useProjects = <T = DefaultResult>(options?: {
  select: (data: DefaultResult) => T,
  onSuccess?: (data: T) => void
}) => {
  return useQuery(
    [AppIds.projects],
    () => getAllProjects(),
    {
      ...options,
    },
  );
};