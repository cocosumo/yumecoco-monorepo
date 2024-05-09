import { Tooltip } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useOrderFormContext } from '../hooks/useOrderRHF';
import { useWatch } from 'react-hook-form';
import { useDownloadOrderSlipById } from '../../../../hooksQuery';
import { LoadingButton } from '@mui/lab';
import { useSnackBar } from 'kokoas-client/src/hooks';

export const DownloadButton = () => {
  const {
    setSnackState,
  } = useSnackBar();
  const {
    formState: { isDirty },
    control,
  } = useOrderFormContext();

  const orderId = useWatch({ 
    control,
    name: 'orderId',
  });

  const { isFetching, refetch } = useDownloadOrderSlipById(orderId);
  
      
  const hasUnsavedChange = isDirty || !orderId;


  const toolTipTitle = hasUnsavedChange ? '保存してください' : '発注書を発行します。';

  return (
    <Tooltip title={toolTipTitle} placement='top' followCursor>
      <span>      
        <LoadingButton 
          color={'info'} 
          disabled={hasUnsavedChange}
          loading={isFetching}
          variant={'contained'}
          value='発注済'
          onClick={async () => {
            const { data, error } = await refetch();

            if (error) {
              setSnackState({
                open: true,
                message: `エラーが発生しました。お手数ですが、管理者にお問い合わせください。${(error as Error)?.message}`,
                severity: 'error',
              });
              return;
            }

            if (data) {
              const {
                fileB64,
                fileName,
              } = data;

              const link = document.createElement('a');
              link.href = `data:application/pdf;base64,${fileB64}`;
              link.download = fileName;
              link.click();
              
            }

          }}
          startIcon={<FileDownloadIcon />}
        >
          発注書発行
        </LoadingButton>
      </span>
    </Tooltip>
  );
};