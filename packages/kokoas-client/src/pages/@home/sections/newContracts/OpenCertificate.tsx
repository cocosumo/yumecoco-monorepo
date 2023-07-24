import { IconButton, Tooltip } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export const OpenCertificate = ({
  contractId,
}:{
  contractId: string
}) => {
  return (
    <Tooltip title={'契約報告書を開く'}>
      <IconButton>
        <CardGiftcardIcon />
      </IconButton>
    </Tooltip>

  );
};