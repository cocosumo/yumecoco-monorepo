import { Tooltip } from '@mui/material';
import { useHasInvoiceB2B } from './useHasInvoiceB2B';
import { useReturnStatus } from './useReturnStatus';
import { LoadingButton } from '@mui/lab';

/**
 * 差し戻しボタン
 */
export const ReturnButton = () => {

  const {
    handleReturnStatus,
    isLoading,
  } = useReturnStatus();

  const hasInvoiceB2B = useHasInvoiceB2B();

  
  return (
    <Tooltip 
      title={hasInvoiceB2B ? '請求書が存在するため差し戻しできません' : ''}
      placement='top' 
      followCursor
    >
      <span>
        <LoadingButton
          variant="contained"
          color="info"
          onClick={handleReturnStatus}
          loading={isLoading}
          disabled={hasInvoiceB2B}
        >
          差し戻し
        </LoadingButton>
      </span>
    </Tooltip>
  );

};