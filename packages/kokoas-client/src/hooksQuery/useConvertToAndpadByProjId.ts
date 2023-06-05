import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { convertProjToAndpad } from '../api/andpad/convertProjToAndpad';
import { useSnackBar } from '../hooks/useSnackBar';


export const useConvertToAndpadByProjId = (
  projId: string | undefined,
  {
    onError,
  }: {
    onError: () => void
  },
) => {
  const { setSnackState } = useSnackBar();
  return useQuery(
    ['andpad', AppIds.projects, projId],
    () => convertProjToAndpad(projId || ''),
    {
      enabled: !!projId,
      onError: (err) => {
        setSnackState({ open: true, message: (err as Error).message, severity: 'error' });
        onError();
      },
    },
  );
};