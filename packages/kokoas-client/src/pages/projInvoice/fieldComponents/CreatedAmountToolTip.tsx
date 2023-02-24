import InfoIcon from '@mui/icons-material/Info';
import { IconButton, Tooltip } from '@mui/material';

export const CreatedAmountToolTip = ({
  infoToolTip,
}: {
  infoToolTip: string,
}) => {

  return (
    <Tooltip title={infoToolTip}>
      <IconButton size={'small'}>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};
