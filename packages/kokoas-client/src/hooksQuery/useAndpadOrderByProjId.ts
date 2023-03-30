import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getOrderByProjId } from '../api/andpad/getOrderByProjId';
import { useSnackBar } from '../hooks/useSnackBar';

/**
 * Andpadから案件データを取得する
 */
export const useAndpadOrderByProjId = (projId: string, {
  enabled = false,
} : {
  enabled: boolean,
}) => {
  const { setSnackState } = useSnackBar();

  return useQuery(
    [AppIds.projects, 'andpad', projId],
    () => getOrderByProjId(projId),
    {
      staleTime: 5000,
      enabled: enabled && !!projId,
      onError: (error: Error) => {
        setSnackState({
          open: true,
          severity: 'warning',
          autoHideDuration: 10000,
          message: error.message,
        });
      },
    },
  );
};