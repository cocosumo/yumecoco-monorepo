import { useMutation } from '@tanstack/react-query';
import { saveAndpadProject } from '../api/andpad/saveAndpadProject';
import { useCommonOptions } from './useCommonOptions';
import { useSnackBar } from '../hooks/useSnackBar';



export const useSaveAndpadProject = () => {
  const commonOptions = useCommonOptions();
  const { setSnackState } = useSnackBar();

  return useMutation(
    saveAndpadProject,
    {
      ...commonOptions,
      onSuccess: ({ data }) => {
        setSnackState({ open:true, message: `ANDPADへ保存が出来ました。システムID ${data?.object?.システムID}`, severity: 'success' });
      },

    },
  );
};