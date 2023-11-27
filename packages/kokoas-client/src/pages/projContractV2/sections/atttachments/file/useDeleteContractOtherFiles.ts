import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFilesFromKintoneByAppId } from 'api-kintone/src/@file/deleteFilesFromKintoneByAppId';
import { AppIds } from 'config';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { useCommonOptions } from 'kokoas-client/src/hooksQuery';
import { IContracts } from 'types';


export const useDeleteContractOtherFiles = (params?: {
  onSuccess?: (data: { revision: string }) => void
}) => {
  const {
    onSuccess,
  } = params || {};

  const { setSnackState } = useSnackBar();
  const queryClient = useQueryClient();

  const commonOptions = useCommonOptions();

  return useMutation(
    ({
      fileKey,
      contractId,
    }:{
      fileKey: string,
      contractId: string,
    }) => deleteFilesFromKintoneByAppId<IContracts>({
      appId: AppIds.contracts,
      fieldCode: 'otherAttachments',
      fileKeys: fileKey,
      recordUuid: contractId,
    }),
    {
      ...commonOptions,
      onSuccess: (data) => {
        onSuccess?.(data);
        setSnackState({
          open: true,
          message: 'ファイルを削除しました。',
          severity: 'success',
        });
        queryClient.invalidateQueries({ queryKey: [AppIds.contracts] });

      },
    },
  );
};