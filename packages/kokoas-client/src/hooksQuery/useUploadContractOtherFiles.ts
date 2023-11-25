import { useMutation } from '@tanstack/react-query';
import { useCommonOptions } from './useCommonOptions';
import { uploadFilesToKintoneByAppId } from 'api-kintone';
import { AppIds } from 'config';
import { IContracts } from 'types';

type DocumentsParam = Parameters<typeof uploadFilesToKintoneByAppId>[0]['documents'];

export const useUploadContractOtherFiles = ({
  onSuccess,
  documents,
}: {
  onSuccess?: (data: DocumentsParam) => Promise<DocumentsParam>
  documents: DocumentsParam
}) => {
  const commonOptions = useCommonOptions();

  return useMutation(
    () => uploadFilesToKintoneByAppId<IContracts>({
      appId: AppIds.contracts,
      fieldCode: 'otherAttachments',
      documents: documents,
    }),
    {
      ...commonOptions,
      onSuccess: (data) => {
        commonOptions.onSuccess();
        onSuccess?.(data);

      },
    },
  );
};