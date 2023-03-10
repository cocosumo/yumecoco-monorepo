import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { IconButton, Tooltip } from '@mui/material';

export const CreatedAmountToolTip = ({
  infoToolTip,
}: {
  infoToolTip: string,
}) => {

  return (
    <Tooltip title={infoToolTip}>
      <IconButton size={'small'}>
        <InfoOutlined />
      </IconButton>
    </Tooltip>
  );
};
