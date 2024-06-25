import { Button } from '@mui/material';
import { useSaveHandler } from '../../hooks/useSaveHandler';



export const SaveInvoice = ({
  disabled,
}: {
  disabled: boolean
}) => {

  const handleSave = useSaveHandler();

  return (
    <Button
      variant={'contained'}
      color='info'
      onClick={handleSave}
      disabled={disabled}
    >
      保存
    </Button >
  );

};
