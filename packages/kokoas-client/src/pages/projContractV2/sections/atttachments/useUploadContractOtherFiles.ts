import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCommonOptions } from '../../../../hooksQuery/useCommonOptions';
import { uploadFilesToKintoneByAppId } from 'api-kintone';
import { AppIds } from 'config';
import { IContracts } from 'types';
import { useSnackBar } from '../../../../hooks/useSnackBar';

export type DocumentsParam = Array<{
  name: string,
  data: unknown,
}>;

export const useUploadContractOtherFiles = (params?: {
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
      documents,
      contractId,
    }:{
      documents: DocumentsParam,
      contractId: string,
    }) => uploadFilesToKintoneByAppId<IContracts>({
      appId: AppIds.contracts,
      fieldCode: 'otherAttachments',
      documents: documents,
      recordUuid: contractId,
    }),
    {
      ...commonOptions,
      onSuccess: (data) => {
        onSuccess?.(data);
        setSnackState({
          open: true,
          message: 'ファイルをアップロードしました。',
          severity: 'success',
        });
        queryClient.invalidateQueries({ queryKey: [AppIds.contracts] });


      },
    },
  );
};