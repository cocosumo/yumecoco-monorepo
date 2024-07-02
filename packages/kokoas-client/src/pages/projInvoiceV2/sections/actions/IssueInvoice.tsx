import { Button, Tooltip } from '@mui/material';



export const IssueInvoice = ({
  disabled,
  isInvoiceIssued,
}: {
  disabled: boolean
  isInvoiceIssued: boolean
}) => {

  return (
    <Tooltip
      title={disabled ? '保存してください' : ''}
    >
      <span>
        <Button
          variant={'outlined'}
          color='info'
          onClick={() => {
            alert('開発中です');
          }}
          disabled={disabled}
        >
          {isInvoiceIssued ? '請求書再発行' : '請求書発行'}
        </Button>
      </span>
    </Tooltip>
  );

};
