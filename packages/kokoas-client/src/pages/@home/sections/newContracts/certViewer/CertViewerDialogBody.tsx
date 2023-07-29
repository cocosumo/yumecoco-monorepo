import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CertViewerContent } from './CertViewerContent';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';
import { useReportCanvas } from '../useReportCanvas';
import { useTypedFormContext } from './hooks/useTypedRHF';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';

export const CertViewerDialogBody = ({
  contractId,
  handleClose,
}:{
  contractId: string,
  handleClose: () => void,
}) => {

  const navigate = useNavigateWithQuery();


  const {
    formState: {
      isDirty,
      isSubmitting,
    },
  } = useTypedFormContext();

  const {
    canvasRef,
    isLoading,
    isGenerating,
    dataUrl,
  } = useReportCanvas(contractId);

  return (
    <>
    
      <DialogTitle>
        契約報告書
      </DialogTitle>
      <DialogContent
        sx={{
          overflow: 'hidden',
          //height: '80vh',
        }}
      >
        {isLoading && (
          <Loading />
        )}
      
        {!isLoading && (
        <CertViewerContent 
          canvasRef={canvasRef}
          hideCanvas={isGenerating || isLoading}
        />
        )}
    
        
      </DialogContent>
      <DialogActions >
        <Button
          onClick={handleClose}
        >
          閉じる
        </Button>
        <Button
          disabled={isSubmitting || isLoading}
          onClick={() => {
            navigate('projContractPreviewV2', {
              contractId,
            });
          }}
        >
          編集する
        </Button>
        <Button
          variant='contained'
          disabled={isDirty || isSubmitting || isLoading}
          href={dataUrl || '#'}
          target='_blank'
          download={`契約報告書_${contractId}.png`}
        >
          ダウンロード
        </Button>
      </DialogActions>
    </>
  );
};