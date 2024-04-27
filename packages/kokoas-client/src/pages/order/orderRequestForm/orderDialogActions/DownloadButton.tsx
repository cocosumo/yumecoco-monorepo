import { Tooltip } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useOrderFormContext } from '../hooks/useOrderRHF';
import { useWatch } from 'react-hook-form';
import { useDownloadOrderSlipById } from '../../../../hooksQuery';
import { LoadingButton } from '@mui/lab';

export const DownloadButton = () => {

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
            const { data } = await refetch();

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