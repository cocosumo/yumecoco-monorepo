import { useEffect } from 'react';
import { useFileUploadHook } from 'react-use-file-upload/dist/lib/types';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { useUploadContractOtherFiles } from './useUploadContractOtherFiles';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { bytesToIEC } from 'libs';

const maxFileSizeMB = 5;
const maxFileSize = maxFileSizeMB * 1024 * 1024;

export const useUploadFilesListener = ({
  props,
}:{
  props: useFileUploadHook
}) => {
  const { setSnackState } = useSnackBar();
  const { mutate } = useUploadContractOtherFiles();


  const contractId = useTypedWatch({
    name: 'contractId',
  }) as string;

  const {
    files,
    setFiles,
    clearAllFiles,
  } = props;

  useEffect(() => {
    if (!files.length || !contractId) return;

    const overSizedFile = files.find((file) => file.size > maxFileSize);

    if (overSizedFile) {
      setSnackState({
        open: true,
        message: `「${overSizedFile.name} 」は ${bytesToIEC(maxFileSize)}を超えています。`,
        severity: 'error',
      });
    } else {
      const documents = files.map((file) => ({
        name: file.name,
        data: file,
      }));
  
      mutate({
        documents,
        contractId,
      });
    }

   

    clearAllFiles();
  
  }, [
    contractId,
    files,
    mutate,
    setFiles, 
    clearAllFiles,
    setSnackState,
  ]);
  
};