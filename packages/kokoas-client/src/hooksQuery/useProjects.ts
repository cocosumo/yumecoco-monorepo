import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from 'api-kintone';
import { AppIds } from 'config';

type DefaultResult = Awaited<ReturnType<typeof getAllProjects>>;

/**
 * 工事を全て取得する
 */
export const useProjects = <T = DefaultResult>(options?: {
  enabled?: boolean,
  select: (data: DefaultResult) => T,
  onSuccess?: (data: T) => void
}) => {
  const {
    enabled = true,
  } = options || {};

  return useQuery(
    [AppIds.projects],
    () => getAllProjects(),
    {
      ...options,
      enabled,
    },
  );
};