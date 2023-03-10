import { Button, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { useSubmitInvoice } from '../hooks/useSubmitInvoice';

export const ActionButtons = () => {

  const { values } = useFormikContext<TypeOfForm>();
  const { invoiceStatus } = values;

  const isCreating = invoiceStatus === 'created' || invoiceStatus === '';
  const isSent = invoiceStatus === 'sent';

  const {
    handleSave,
    handleIssue,
    handleReissue,
    handleVoided,
  } = useSubmitInvoice();

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      spacing={2}
    >
      <Button
        variant="contained"
        onClick={handleSave}
        disabled={isSent}
      >
        保存
      </Button>

      <Button
        variant="contained"
        onClick={handleIssue}
        disabled={isSent}
      >
        請求書発行
      </Button>

      {!isCreating &&
        <Button
          variant="contained"
          onClick={handleReissue}
        >
          再発行
        </Button>}

      {!isCreating &&
        <Button
          variant="contained"
          onClick={handleVoided}
        >
          破棄
        </Button>}
    </Stack>
  );
};