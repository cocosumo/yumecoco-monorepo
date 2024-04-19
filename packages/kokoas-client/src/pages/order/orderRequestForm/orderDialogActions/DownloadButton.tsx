import { Button, Tooltip } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useOrderFormContext } from '../hooks/useOrderRHF';
import { useWatch } from 'react-hook-form';
import { useSaveOrderRequest } from '../hooks/useSaveOrderRequest';

export const DownloadButton = () => {
  const {
    formState: { isDirty },
    control,
  } = useOrderFormContext();

  const orderId = useWatch({ 
    control,
    name: 'orderId',
  });


  const {
    handleSubmit,
  } = useSaveOrderRequest();
  
      
  const hasUnsavedChange = isDirty || !orderId;


  const toolTipTitle = hasUnsavedChange ? '保存してください' : '発注書を発行します。';

  return (
    <Tooltip title={toolTipTitle} placement='top' followCursor>
      <span>      
        <Button 
          color={'info'} 
          disabled={hasUnsavedChange}
          variant={'contained'}
          value='発注済'
          onClick={async (e) => {
            if (!orderId) return;
            await handleSubmit(e);
            alert('ステータスは更新しましたが、発注書の発行はまだ実装されていません。');

          }}
          startIcon={<FileDownloadIcon />}
        >
          発注書発行
        </Button>
      </span>
    </Tooltip>
  );
};