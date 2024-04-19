import { Button, Tooltip } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useOrderFormContext, useOrderWatch } from '../hooks/useOrderRHF';
import { TOrderForm } from '../schema';

export const DownloadButton = () => {
  const {
    formState: { isDirty },
  } = useOrderFormContext();

  const orderId = useOrderWatch({ name: 'orderId' }) as TOrderForm['orderId'];
  const hasUnsavedChange = isDirty || !orderId;


  const toolTipTitle = hasUnsavedChange ? '保存してください' : '発注書を発行します。';

  return (
    <Tooltip title={toolTipTitle} placement='top' followCursor>
      <span>      
        <Button 
          color={'info'} 
          disabled={hasUnsavedChange}
          variant={'contained'}
          onClick={() => alert('未実装です。もうしばらくお待ちください。')}
          startIcon={<FileDownloadIcon />}
        >
          発注書発行
        </Button>
      </span>
    </Tooltip>
  );
};